const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const config = require('./config/database')

console.log(process.env.PASSWORD + 'hi')


mongoose.connect(config.database)

mongoose.connection.on('connected', ()=>{
    console.log("connected to db " + config.database)
})

mongoose.connection.on('error', (err)=>{
    console.log("database error " + err)
})


const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));




const email = require('./routes/email')
const users = require('./routes/users')
const appointment = require('./routes/appointments')


app.use('/appointments', appointment)
app.use('/email', email)
app.use('/users', users)


const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));





app.get('/', (req, res) => {
    res.send('invaild endpoint');
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

app.listen(port, ()=>{
    console.log("server started on port" + port)
})