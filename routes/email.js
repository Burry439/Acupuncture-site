const nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.put('/', (req,res)=>{

    console.log(req.body)

    let transporter = nodemailer.createTransport({
        service : 'SendGrid',
        
         secure: false, 
        auth: {
            user: 'burry439@gmail.com', 
            pass: process.env.SENDGRID_PASSWORD || process.env.PASSWORD
        },
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: req.body.name + '     ' + req.body.email, // sender address
        to: 'burry439@gmail.com', // list of receivers
        subject: 'new message', // Subject line
        text: 'Name:' + req.body.name + 'Message:' + req.body.msg + 'Phone Number: ' + req.body.phone + 'Email: ' + req.body.email, // plain text body
        html: ' <br> Name:' + req.body.name + '<br> Phone Number: ' + req.body.phone + '<br> Email: ' + req.body.email + '<br>' + '<br> Message:' + req.body.msg + '<br>'// html body
    };


    let mailOptions2 = {
        from: 'Burry the guy in charge' + ' ' + 'burry439@gmail.com', // sender address
        to: req.body.email , // list of receivers
        subject: 'Message Recived', // Subject line
        text: 'Hey' + req.body.name + 'We got your message and will reply to you shortly', // plain text body
        html: ' <br>' + 'Hey ' + req.body.name + ' We got your message and will reply to you shortly' + '<br>'// html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) { 
            return console.log("ERRORRRRR " + error);
        } 
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
     
    });
   
    transporter.sendMail(mailOptions2, (error, info) => {
        if (error) { 
            return console.log("ERRORRRRR " + error);
        } 
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
     
    });

   
    res.json("Done")

})










module.exports  = router
