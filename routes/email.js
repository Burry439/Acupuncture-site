const nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{

    console.log('here')

    let transporter = nodemailer.createTransport({
        service : 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'burry439@gmail.com', // generated ethereal user
            pass: '1zxcvbnm' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"the dudeeee👻" <furrur439@gmail.com>', // sender address
        to: 'burry439@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world yessss?</b>' // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("ERRORRRRR " + error);
        } 
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.json("heyo")
    });
   
   
})

module.exports = router
