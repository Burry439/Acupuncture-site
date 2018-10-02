const express = require('express')
const router = express.Router()
const Appointment = require('../models/appointment')
const nodemailer = require('nodemailer');

const sgMail = require('@sendgrid/mail');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationEmail = (appointment)=>{

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
        from : appointment.name + '     ' + appointment.email, // sender address
        to: 'burry439@gmail.com', // list of receivers
        subject: 'New Appointment', // Subject line
        text: 'Name:' +appointment.name + 'Treatment Type: ' +appointment.title + 'Phone Number: ' +appointment.phone + 'Email: ' +appointment.email + ' Time ' + appointment.start , // plain text body
        html: ' <br> Name:' +appointment.name + '<br> Phone Number: ' +appointment.phone + '<br> Email: ' +appointment.email + '<br>' + 'Treatement Type: ' + appointment.title + '<br>' + ' Time: ' + appointment.start + '<br>'// html body
    };


    let mailOptions2 = {
        from : 'burry439@gmail.com'+ '     ' + 'Burry The Guy In Charge', // sender address
        to: appointment.email, // list of receivers
        subject: 'Appointment Details', // Subject line
        text: 'Hey ' +appointment.name + ' We Got your Request For ' +appointment.title + ' On ' + appointment.start + ' Will See you soon', // plain text body
        html: ' <br>' +  'Hey ' +appointment.name + ' We Got your Request For ' +appointment.title + ' On ' + appointment.start + ' Will See you soon'   + '<br>'// html body
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

}










router.post('/newAppointement', (req,res)=>{
    console.log(req.body)


    const date = new Date(req.body.start)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day =  date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()


    theDate = months[month] +' ' + day + ' ' + year + ' At: ' + hour +":" + minute


    const appointment = new Appointment
    ({
        title: req.body.title,
        start: theDate,
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
