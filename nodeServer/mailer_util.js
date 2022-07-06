"use strict";
var dot = require('dotenv').config()
var axios = require('axios')

async function main({...json}) {
  //make call to python server to send email.
  axios.post('/emailserver',json)
  //nginx when /emailserver pull from 2400 server and call it
}
module.exports.main = main
