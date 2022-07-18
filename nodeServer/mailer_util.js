"use strict";
var dot = require('dotenv').config()
var axios = require('axios')

 function main(json,res) {
  console.log('in here mailer')
  if (json.hasOwnProperty('phone') == false){
    json.phone="N/A"
  }
  if (json.hasOwnProperty('message') == false){
    json.message = "N/A"
  }
  var config = {
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  }
  //make call to python server to send email.
  if (json.hasOwnProperty('fullname') && json.hasOwnProperty('email')){
      axios.post(`http://${process.env.python_server_ip}:2400/emailserver`,json,config).then(response=>{
         console.log('sucessful')
         res.send("successful")
      }).catch(err=>{
        console.log(err)
        res.status(500)
        res.send("Failed axios requests")
      })
    } else {
      res.status(500)
      res.send("Failed")
}
}
module.exports.main = main