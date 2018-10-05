const express = require('express')
const router = express.Router()
const Treatment = require('../models/treatment')


router.post('/newTreatment', (req,res)=>{


        let treatment = new Treatment(
            {
                name: req.body.name,
                duration: req.body.duration,
                price: req.body.price,
                details : req.body.details
            }
        )

            treatment.save((err, treatment)=>{
                console.log(treatment)
                res.json(treatment)
            })

       
})

router.put('/editTreatment', (req,res)=>{
   Treatment.findByIdAndUpdate(req.body.id, req.body.treatment, (err,treatment)=>{
      res.json(req.body.treatment)
   })
})


router.delete('/deleteTreatment', (req,res)=>{
    Treatment.findByIdAndRemove(req.headers.treatmentid, (err, treatment) =>{
        console.log(treatment)
        res.json(treatment[0])
    })  
})

router.get('/getTreatment', (req,res)=>{
    console.log(req.headers.treatmentid)
    Treatment.find({_id:req.headers.treatmentid }, (err, treatment) =>{
        console.log(treatment)
        res.json(treatment[0])
    })
})


router.get('/getTreatments', (req,res)=>{
    Treatment.find({}, (err, treatments) =>{
        res.json(treatments)
    })
})

module.exports  = router
