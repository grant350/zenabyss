"use strict";
var dot = require('dotenv').config()
var axios = require('axios')

async function main({...json}) {
  //make call to python server to send email.

  axios.post('http://127.0.0.1:2400/emailserver',json)
}
module.exports.main = main
