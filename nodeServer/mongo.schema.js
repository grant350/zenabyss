

const mongoose = require('mongoose');
require('dotenv').config()
// mongoose.connect(`mongodb://grant:${process.env.password}@ec2-3-80-154-255.compute-1.amazonaws.com:27017/zenabyss`);
mongoose.connect(`mongodb://grant:${process.env.password}@localhost:27017/zenabyss`);

const { Schema } = mongoose;

//login to send email to validate correct email * future
// client to display username
// dashboard page with sidebar of all the other pages [how to use page, edit product page with delete, search icon corner drop down]
//


const User = new Schema({
  user_id:{type:String,unique:true},
  username: String,
  salt: String,
  hash:String,
  friends:[{ user_id:String, visits:Number}],
  date:Date,
  email:String
})

const User_Session = new Schema({
  user_id:{type:String, unique:true},
  expiration:Date,
  salt:String

})


const Products = new Schema({
  productId: String,
  user_id: String,
  upc:  {
    type: String,
    unique: true
  },
  BIN:String,
  model: String,
  brand: String,
  title: String,
  product_cost: Number,
  retail_price: Number,
  quantity: Number,
  fees: Number,
  store_location: {lat:Number, lon:Number, name:String},
  madeInUSA:Boolean,
  website: String,
  image: String,
  ingredients: [String],
  date: Date,
  dimension: {width:Number,height:Number,length:Number},
  importedBy: [String],
  oz:Number,
  parentCompany: String,
  platform:String,
  active:Boolean
});

//when you ship an item supply for packages go down.
// var SupplyUse = new Schema({



// })






var SuppliesBought = new Schema({
  data:Date,
item_name:String,
item_cost:Number,
item_image:Number,
address:String,
website:String,
reciept_image: String,
item_contents: [
  {
    product_id:String,
    product_name:String,
    product_title:String,
  }
]
})

//for inventory bought you can edit the items in another page as it may take awhile to upload each product
// const InventoryBought = new Schema({
// data:Date,
// item_name:String,
// item_cost:Number,
// item_image:Number,
// address:String,
// website:String,
// reciept_image: String,
// item_contents: [
//   {
//     product_id:String,
//     product_name:String,
//     product_title:String,
//   }
// ]


// })



const Expensed = new Schema({
  date:Date,
  upc: String,
  quantity: Number,
  images: [{type:String}],
  total_cost:Number,
  reason:String,
})


const Orders = new Schema({
  date:Date,
  tracking:String,
  uuid:{type:String,unique:true},
  platform: String,
  shipping_cost:Number,
  tax:Number,
  state:String,
  customer_name:String,
  total:Number,
  customer_street:String,
  products:[{
    orderID: String,
    product_cost:String,
    model: String,
    quantity: Number,
    upc:String
  }]});

module.exports =  {Products,Orders,Expensed,User,User_Session};