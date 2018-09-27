const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
   
    title:
    {
        type:String,
        require:true
    },
    start: 
    {
       type:String,
       require: true 
    },
    name:
    {
        type:String,
        require:true
    },
    email: 
    {
       type:String,
       require: true 
    },
    phone: 
    {
       type:Number,
       require: true 
    },
})

const Appointment = module.exports = mongoose.model("appointment", appointmentSchema)

