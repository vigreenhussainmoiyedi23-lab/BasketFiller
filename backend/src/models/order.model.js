const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    totalPrice: Number,
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            price: Number, // final price after discount
        }
    ],
    totalAmount: Number,       // sum of all products’ prices * quantities
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
    paymentOption:{type:String,enum:['COD','ONLINE'], default:'COD'},
}, {
    toJSON: { virtuals: true }  // 👈 important
})


const productModel = mongoose.model('product', productSchema)

module.exports = productModel