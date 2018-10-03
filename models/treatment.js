const mongoose = require("mongoose");

const treatmentSchema = mongoose.Schema({
   
    name:
    {
        type:String,
        require:true
    },
    details: 
    {
       type:String,
       require: true 
    },
   price:
    {
        type:Number,
        require:true
    },
    duration: 
    {
       type: Number,
       require: true 
    }
})

const Treatment = module.exports = mongoose.model("treatment", treatmentSchema)