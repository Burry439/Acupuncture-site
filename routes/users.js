const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const jwt = require("jsonwebtoken")
const config = require("../config/database")



router.post('/authenticate', (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password

    User.getUserByEmail(email, (err,user)=>{
        if(err) throw err
        if(!user)
        {
          return  res.json({success: false, message: "user not found"})
        }

      
        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err
            if(isMatch)
            {   
                
                const token = jwt.sign({data:user}, config.secret, 
                {
                  expiresIn:7200000,
                })  
                res.json({
                success:true,
                token: "JWT " + token,
                user:
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                }
                })
            }
            else
            {
                return  res.json({success: false, message: "wrong password"})
            }
     

        })
    })
})


module.exports = router
