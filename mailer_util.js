"use strict";
var dot = require('dotenv').config()
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(message,fullname,from,to) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "zenabysscompany@gmail.com",
        pass: process.env.googlePass
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from:`${fullname} 👻"<${from}>`, // sender address
    to: to, // list of receivers
    subject: 'message from zenabyss.com', // Subject line
    text: message, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports.main = main
