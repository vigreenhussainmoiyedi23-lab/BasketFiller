const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    fullName: String,
    phoneNumber: Number,
    street: String,
    city: String,
    state: {
        type: String,
        enum: ["Madhya Pradesh", "Uttrakhand", "Haryana", "Uttar Pradesh", "Maharashtra", "Gujarat"],
        required: true,
    },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            price: Number, // final price after discount
            totalPrice: Number,//price after price*quantity
        }
    ],
    totalAmount: Number,// sum of all  totalPrice
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    orderStatus: {
        type: String,
        enum: ["placed", "shipped", "delivered", "cancelled"],
        default: "placed"
    },
    createdAt: { type: Date, default: Date.now },
    paymentOption: { type: String, enum: ['COD', 'ONLINE'], default: 'COD' },
}, {
    toJSON: { virtuals: true }  // 👈 important
})
const orderModel = mongoose.model('order', orderSchema)

module.exports = orderModel