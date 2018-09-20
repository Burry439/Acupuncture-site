const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');










const app = express()
app.use(cors())


const email = require('./routes/email')

app.use('/email', email)


const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));



app.use(bodyParser.json())



app.get('/', (req, res) => {
    res.send('invaild endpoint');
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

app.listen(port, ()=>{
    console.log("server started on port" + port)
})