const express = require('express')
const Router = express.Router()
const { UserCanAcces }=require('../middlewares/AuthenticationMiddleware.js')
const {isadmin}=require('../middlewares/AdminMiddleware.js')
// order routes
// User checks out and creates an order
Router.post('/create',UserCanAcces,(req,res)=>{

})

// Admin updates order status
Router.post('/update/:orderid',isadmin,(req,res)=>{
    
})

module.exports = Router