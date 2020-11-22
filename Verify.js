/*
MIT License

Copyright (c) 2020 Squirrelcoding

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var nodemailer = require('nodemailer');
var transporter = "";
var emaill = "";
var passwordd = "";
var mailOptionss = "";
var sent = false;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function randint(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var code = randint(100000, 1000000);
exports.createCode = function createCustomCode(customCode) {
   code = customCode
}
exports.authentication = function authentication(email, password) {
transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: true,
  auth: {
    user: email,
    pass: password
  }
});
emaill = email
passwordd = password
}
exports.sendCode = function sendCode(target) {
  var mailOptions = {
    from: emaill,
    to: target,
    subject: 'Sending Email using Node.js',
    text: 'Here is the code: ' + code
  };
  transporter.sendMail(mailOptions, function(error){
    if (error) {
      console.log(error);
    }/* else {
      console.log('Email sent Successfuly!');
    }*/
  });
}
exports.verify = function verify(inputCode, ifCorrectFunction, ifIncorretFunction) {
  if (inputCode == code) {
   ifCorrectFunction();
  }
  else {
    ifIncorretFunction();
}
}
