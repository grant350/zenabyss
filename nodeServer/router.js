const mongoose = require('mongoose');
var schemas = require('./mongo.schema');
const ProductsModel = mongoose.model('products', schemas.Products);
const OrdersModel = mongoose.model('orders', schemas.Orders);
const Users = mongoose.model('Users', schemas.User);
const User_Session = mongoose.model('User_Sessions', schemas.User_Session);
const puppeteer = require('puppeteer');

const { v4: uuidv4 } = require('uuid');
var fs = require('fs');
var path = require('path')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var mailer = require('./mailer_util');

class Router {
  constructor(){
    this.createSession = this.createSession.bind(this);
    this.contact =  this.contact.bind(this);
  }

  getExpiration(h){
    return Math.floor((Date.now() +(h*60*1000))) ;
  }
  getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return  mm + '/' + dd + '/' + yyyy;
  }

  insertProduct(req,res,next){
      req.body.productId=uuidv4();
      req.body.date = this.getDate();
      req.body.user_id = req.user_id
    ProductsModel.create(req.body).then(result=>{
      res.json({data:result,exists:false});
    }).catch(err=>{
      var obj = Object.assign({},req.body)
      delete obj['date'];
      delete obj['upc'];
      ProductsModel.updateOne({upc:req.body.upc},obj).then(update=>{
        ProductsModel.findOne({upc:req.body.upc}).then(result=>{
          res.status(200).send('updated');
         })
      })
   })
  }


login(req,res,next){

  var password = req.body.password;
  var username = req.body.username;
  //later can sign in with username and email
  //later add oauth.
  Users.find({username:username}).then(results=>{
    if (results.length >0){
      bcrypt.compare(password, results[0].hash, (err, result)=> {
        if(result){
          req.user = {};
          req.user.salt = results[0].salt;
          req.user.user_id = results[0].user_id;
          this.createSession(req,res,next);
        } else {
         res.json({redirect:'/login'})
        }
      });

    } else {
      throw new Error('no users');
    }
  }).catch(err=>{

  })

}



  createSession(req,res,next){

    var user_id = req.user.user_id;
    var salt = req.user.salt
    var expiration = this.getExpiration(.016);
    var payload = {
      iat: expiration,
      user_id: user_id,
      role: 'user'
    }
    var token = jwt.sign(payload, req.user.salt);
    // find session and replace or create new one
      User_Session.create({user_id:user_id,expiration:expiration,salt:salt}).then(new_session=>{
        res.json({token:token,redirect:'/',user_id:user_id});
      }).catch(err=>{
        User_Session.updateOne({user_id:user_id},{expiration:expiration}).then(new_session=>{
          res.json({token:token,redirect:'/',user_id:user_id});
        }).catch(err=>{
          console.log(err)
        })
      })

  }

  createUser(req,res,next){
    req.body.username=req.body.username.toLowerCase()
    Users.find({$or:[{username: req.body.username},{email:req.body.email}] }).then(result=>{
      //send client an error bar user exists
      if (result.length > 0){
        res.json({redirect:'/signup',error:"user already exists with same username or email address please use another"});
      } else {
        console.log('else')
        var obj = Object.assign({},req.body)
        obj.date = this.getDate();
        obj.user_id = uuidv4();
        bcrypt.genSalt(10, (err, salt)=> {
          obj.salt=salt
          bcrypt.hash(obj.password, salt, (err, hash)=> {
              obj.hash=hash;
              delete obj.password;
              Users.create(obj).then(results=>{
                req.user=obj;
                this.createSession(req,res,next);
              })
          });
      });
      }

    }).catch(err=>{
        console.log(err)

    })

  }


searchProducts(req,res,next){

  console.log(req.user_id)
  new Promise( (resolve,reject)=>{
    var promises=[];
    promises.push(ProductsModel.find({ user_id: req.user_id, upc: new RegExp('.*' + req.query.query + '.*')}).then((results)=>{
        return results;
     }));
     promises.push(ProductsModel.find({ user_id: req.user_id, title: new RegExp("^.*" + req.query.query.toLowerCase(), "i")  }).then((results)=>{
      return results;
    }));
     promises.push(ProductsModel.find({ user_id: req.user_id, model: new RegExp('.*' + req.query.query + '.*')}).then((results)=>{
         return results;
     }));
     promises.push(ProductsModel.find({ user_id: req.user_id, BIN: new RegExp('.*' + req.query.query + '.*')}).then((results)=>{
       return results
     }));
     resolve(promises)
  }).then(promises=>{
    Promise.all(promises).then(arrays=>{
      var items={};
      arrays.forEach(array=>{
        array.forEach(item=>{
          if (items[item.upc] === undefined){
            items[item.upc] = item
          }
        })
       })
       res.json({data:Object.values(items).slice(0,15)})
      }).catch(err=>{
          // console.log(err)
      })
  }).catch(err=>{
    // console.log(err)
  })



}

insertOrder(req,res,next){
  req.body.uuid=uuidv4()
  var products =  req.body.products;
  req.body.date= this.getDate();
  //make promise wrap then load [upc]:quantityRemoval
  //object.keys . foreach remove total qty

  var getTotal= ()=>{
    var total=0
    req.body.products.forEach(product=>{
      total+= parseFloat(product.product_cost)
    });
    total += parseFloat(req.body.tax);
    console.log('total',total)
    return total.toFixed(2);
  }

  req.body.total = getTotal();
  var promises = products.map(product=>{
    console.log('product',product);
    return ProductsModel.find({upc:product.upc}).then(result=>{
      var mongoProduct=result[0];
//.select({ "name": 1, "_id": 0})
      console.log(product.quantity)
      var qty = mongoProduct.quantity - product.quantity;

      console.log('qty',qty);
      if (qty >=0){
       return ProductsModel.updateOne({ user_id: req.user_id, upc:product.upc},{"$set": {quantity:qty}})
      } else {
        throw new Error('too little qty')
      }
    })
  })
Promise.all(promises).then(updatedProducts=>{
  console.log('updated inventory',updatedProducts);
 OrdersModel.create(req.body).then(response=>{
    res.send('success')
  }).catch(err=>{
    res.status(500).send(err)
  })
}).catch(err=>{
  console.log(err)
  res.status(500).send('cant remove inventory too little to spare')
})

}


contact(req,res,next){

 var data = req.body;
 console.log('called contact')
 mailer.main({message:data.message,fullname:data.fullname,email:data.email},res)

}

}
module.exports = Router;