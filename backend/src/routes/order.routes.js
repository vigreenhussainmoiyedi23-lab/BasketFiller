const express = require('express')
const Router = express.Router()
const { UserCanAcces }=require('../middlewares/AuthenticationMiddleware.js')
// order routes

Router.post('/create',UserCanAcces,(req,res)=>{

})



module.exports = Router