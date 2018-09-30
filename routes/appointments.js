const express = require('express')
const router = express.Router()
const Appointment = require('../models/appointment')
const nodemailer = require('nodemailer');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationEmail = (appointment)=>{

    let transporter = nodemailer.createTransport({
        service : 'SendGrid',
        
         secure: false, 
        auth: {
            user: 'burry439@gmail.com', 
            pass: process.env.SENDGRID_PASSWORD 
        },
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from : appointment.name + '     ' + appointment.email, // sender address
        to: 'burry439@gmail.com', // list of receivers
        subject: 'New Appointment', // Subject line
        text: 'Name:' +appointment.name + 'Treatment Type: ' +appointment.title + 'Phone Number: ' +appointment.phone + 'Email: ' +appointment.email, // plain text body
        html: ' <br> Name:' +appointment.name + '<br> Phone Number: ' +appointment.phone + '<br> Email: ' +appointment.email + '<br>' + '<br> Treatement Type: ' + appointment.title + '<br>'// html body
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


}










router.post('/newAppointement', (req,res)=>{
    console.log(req.body)
    const appointment = new Appointment
    ({
        title: req.body.title,
        start: req.body.start,
        name : req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
    appointment.save((err,appointment)=>{
        if (err)  console.log(err)
        sendConfirmationEmail(appointment)
        res.json(appointment)
    })
    
})






router.get('/getAppointements',(req,res)=>{
    Appointment.find({}, (err,appointments)=>{
        console.log(appointments)
        res.json(appointments)
    })
})

module.exports = router
