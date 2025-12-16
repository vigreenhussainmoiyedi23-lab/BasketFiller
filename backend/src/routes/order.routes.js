const express = require('express')
const Router = express.Router()
const { UserCanAcces }=require('../middlewares/AuthenticationMiddleware.js')
const {isadmin}=require('../middlewares/AdminMiddleware.js')
// order routes
// User checks out and creates an order
Router.post('/create',UserCanAcces,(req,res)=>{
const {paymentOption,address}=req.body
//1 User places order
//2 Payment gateway processes payment
//3 Backend verifies payment (server-side)
//4 Order is created in DB
//5 Stock is updated
//6 User is shown success/failure
//7 Payment status is stored permanently
})

// Admin updates order status
Router.post('/update/:orderid',isadmin,(req,res)=>{
    
})

module.exports = Router