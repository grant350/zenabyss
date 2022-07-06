var express = require('express');
var app = express();
var port = 8080;
var path = require('path');
var axios = require('axios');
var bp = require('body-parser');
var cors = require('cors');
var routercontainer = require('./router');
const router = new routercontainer();
var fs = require('fs');
var schemas = require('./mongo.schema');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User_Session = mongoose.model('User_Sessions', schemas.User_Session);


function ImageMiddleware(req,res,next){
  if (req.body.image){
    if (req.body.image.image_structure){
      var filename = req.body.image.image_structure.filename.replaceAll(' ','_')
      var imagepath = '/images/'+filename;

      function filterData(data) {
        var base64pure = data.split(',')[1];
        let buff = Buffer.from(base64pure, 'base64');
        return buff
      }
      fs.writeFileSync(path.join(__dirname,'public/images/'+filename),filterData(req.body.image['64bit']))
      req.body.image = imagepath;
      next()
    } else {
      delete req.body.image
      next()
    }
  } else {
    delete req.body.image
    next()
  }
}

var Authorize_Session = (req,res,next)=>{

     const authHeader = req.headers.authorization;
     var token = null
     try {
      token = authHeader.split(' ')[1];
     } catch {
      token = null
     }
     req.user_id = req.query.user_id;
      if (req.query.user_id !== undefined && token !== null){
         User_Session.find({user_id: req.query.user_id }).then(session=>{
           console.log(session)
          req.jwtData = jwt.verify(token, session[0].salt);
          if (req.jwtData){
            if (session.length >0){
              var date =   Math.floor(Date.now());
              var expirationDate =  new Date(session[0].expiration);
              expirationDate=expirationDate.getTime
              if (date > expirationDate){
                req.authorized = {redirect:'/login',authorized:false}
              } else {
                req.authorized = {authorized:true,redirect:'/'}
              }
            }
          } else {
            req.authorized = {redirect:'/login',authorized:false}
          }
          next()

         })
      } else {
        req.authorized = {authorized:false,redirect:'/login'}
        next()
      }



}

//use

app.use(bp.json({ limit: "50mb" }));
app.use(cors());
app.use(express.static(path.join(__dirname,'build')));
app.use(ImageMiddleware)
app.set('view engine', 'pug')
app.use(Authorize_Session)


app.post('/contact', (req,res,next)=>{
  router.contact(req,res,next)
})


app.get('/authenticate', (req,res,next)=>{
  res.json(req.authorized)
})


app.post('/login', (req,res,next)=>{
  router.login(req,res,next)
})
//static routes
app.get('/about', (req,res,next)=>{
  res.sendFile(path.join(__dirname, 'build/index.html') );
})
app.get('/about', (req,res,next)=>{
  res.sendFile(path.join(__dirname, 'build/index.html') );
})
app.get('/insert/order', (req,res,next)=>{
  res.sendFile(path.join(__dirname, 'build/index.html') );
})
app.get('/insert/product', (req,res,next)=>{
  res.sendFile(path.join(__dirname, 'build/index.html') );
})
app.get('/login', (req,res,next)=>{
  res.sendFile(path.join(__dirname, 'build/index.html') );
})
app.get('/signup', (req,res,next)=>{
  res.sendFile(path.join(__dirname, 'build/index.html') );
})

app.get('/profile', (req,res,next)=>{
  router.getProfileHTML(req,res,next)
})


app.post('/createUser', (req,res,next)=>{
  router.createUser(req,res,next)
})

app.post('/insertProduct', (req,res,next)=>{
  router.insertProduct(req,res,next)
})

app.post('/insertOrder', (req,res,next)=>{
  router.insertOrder(req,res,next)
})
app.get('/searchProducts', (req,res,next)=>{

  router.searchProducts(req,res,next)
})

app.get('*',function(req,res){
  res.status(404).render('404');
});
app.listen(port,function(){
  console.log('listening on ',port);
});

