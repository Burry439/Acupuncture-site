const nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/',(req,res)=>{

    console.log('here')

    let transporter = nodemailer.createTransport({
        service : 'SendGrid',
        
         secure: false, 
        auth: {
            user: 'burry439@gmail.com', 
            pass: 'super439@gmail.com' 
        },
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"the dudaaae" <dude439@gmail.com>', // sender address
        to: 'burry439@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello woeee?', // plain text body
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
