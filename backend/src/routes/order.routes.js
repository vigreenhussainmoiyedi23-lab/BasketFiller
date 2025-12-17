const express = require('express')
const Router = express.Router()
const { UserCanAcces } = require('../middlewares/AuthenticationMiddleware.js')
const { isadmin } = require('../middlewares/AdminMiddleware.js')
const UserModel = require('../models/user.model.js')
const productModel = require('../models/product.model.js')
const orderModel = require('../models/order.model.js')
const {OrderValidator}=require("../utils/express-validator.js")
// order routes
// User checks out and creates an order
Router.post('/create', UserCanAcces, OrderValidator,async (req, res) => {
    const { paymentOption, fullName, state, city, street, phoneNumber, paymentStatus } = req.body
    if (paymentStatus == "failed") return res.status(400).json({ message: "Payment Failed Please Try Again" })
    const user = await UserModel.findOne({ _id: req.user._id }).populate("CartItems.product")
    const { CartItems } = user
    // a property of the order is products where the finalprice quantity and everything is stored
    const products = await CartItems.map(n => {
        const finalPrice = n.product.finalPrice;
        const quantity = n.quantity
        const totalPrice = finalPrice * quantity
        const productId = n.product._id
        n = { finalPrice, quantity, totalPrice, productId }
        return n
    })

    // decreasing the stock left value by the value of the quantity ordered by user
    const UpdateProducts = await Promise.all(CartItems.map(async (n) => {
        const product = await productModel.findOne({ _id: n.product._id })
        const stock = product.stock - n.quantity
        product.stock = stock
        await product.save()
        console.log(product)
        return "success"
    }))

    // removing every product from the cart


    // calculating the total amount or the total bill
    const totalAmount = await products.reduce((acc, val) => {
       return acc += val.totalPrice;
    }, 0)

    const orderCreated=await orderModel.create({
        user:user._id,
        street,
        city,
        state,
        phoneNumber,
        fullName,
        products,
        paymentOption,
        totalAmount
    })

    res.send({ orderCreated })
})

// Admin updates order status
Router.post('/update/:orderid', isadmin, (req, res) => {

})

module.exports = Router // user.CartItems = []
// await user.save()