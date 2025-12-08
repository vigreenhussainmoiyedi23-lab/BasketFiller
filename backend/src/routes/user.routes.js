const express=require('express')
const app = require('../app')
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('testing')
})

module.exports=router