const mongoose = require('mongoose');
var schemas = require('./mongo.schema');
const ProductsModel = mongoose.model('products', schemas.Products);
const OrdersModel = mongoose.model('orders', schemas.Orders);
const Users = mongoose.model('Users', schemas.User);
const User_Session = mongoose.model('User_Sessions', schemas.User_Session);

const { v4: uuidv4 } = require('uuid');
var fs = require('fs');
var path = require('path')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class Router {

  getExpiration(h){
    return Math.floor(Date.now() / 1000) + (h*60*60*1000);
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


  //check auth in jwt check that jwt is valid and matches salt if salt matches but token expired create new session
  //verify userid+salt
  createSession(req,res,next){

    var user_id = req.user.user_id;
    var salt = req.user.salt
    var expiration = this.getExpiration(2);
    var payload = {
      iat: expiration,
      user_id: user_id,
      role: 'user'
    }
    var token = jwt.sign(payload, req.user.user_id+req.user.salt);
      User_Session.create({user_id:user_id,expiration:expiration,salt:salt}).then(new_session=>{
        res.json({token:token,redirect:'/'});
      }).catch(err=>{
        User_Session.updateOne({user_id:user_id},{expiration:expiration}).then(new_session=>{
          res.json({token:token,redirect:'/'});
        }).catch(err=>{
          console.log(err)
        })
      })

  }

  createUser(req,res,next){
    console.log(req.body)
    Users.findOne({username:req.body.username}).then(result=>{
      //send client an error bar user exists
      res.json({redirect:'/login',error:"user already exists"});

    }).catch(err=>{
      var obj = Object.assign({},req.body)
      obj.date = this.getDate();
      obj.user_id = uuidv4();
      bcrypt.genSalt(10, (err, salt)=> {
        obj.salt=salt
        bcrypt.hash(obj.password, salt, (err, hash)=> {
            // Store hash in your password DB.
            obj.hash=hash;
            delete obj.password;
            Users.create(obj).then(results=>{
              req.user=obj;
              this.createSession(req,res,next);
            })
        });
    });

    })

  }


searchProducts(req,res,next){
  new Promise( (resolve,reject)=>{
    var promises=[];
    promises.push(ProductsModel.find({ upc: new RegExp('.*' + req.query.query + '.*')}).then((results)=>{
        return results;
     }));
     promises.push(ProductsModel.find({ title: new RegExp("^.*" + req.query.query.toLowerCase(), "i")  }).then((results)=>{
      return results;
    }));
     promises.push(ProductsModel.find({ model: new RegExp('.*' + req.query.query + '.*')}).then((results)=>{
         return results;
     }));
     promises.push(ProductsModel.find({ BIN: new RegExp('.*' + req.query.query + '.*')}).then((results)=>{
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

      console.log(product.quantity)
      var qty = mongoProduct.quantity - product.quantity;

      console.log('qty',qty);
      if (qty >=0){
       return ProductsModel.updateOne({upc:product.upc},{"$set": {quantity:qty}})
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
  // OrdersModel.create(req.body).then(response=>{
  //   console.log('was created');
  //   res.send('success')
  // }).catch(err=>{
  //   res.status(500).send(err)
  // })
}


}

module.exports = Router;