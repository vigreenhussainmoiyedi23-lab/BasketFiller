const express=require('express')
const app = require('../app')
const router=express.Router()

router.get('/profile',(req,res)=>{
    res.status(200).json({user:req.user})
})

module.exports=router