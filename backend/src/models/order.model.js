const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    address: String,
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            price: Number, // final price after discount
            totalPrice: Number,//price after price*quantity
        }
    ],
    totalAmount: Number,// sum of all  totalPrice
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
    paymentOption:{type:String,enum:['COD','ONLINE'], default:'COD'},
}, {
    toJSON: { virtuals: true }  // 👈 important
})
const orderModel = mongoose.model('order', orderSchema)

module.exports = orderModel