const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    fullName: String,
    phoneNumber: Number,
    street: String,
    city: String,
    state: {
        type: String,
        enum: [
            // 🌆 States
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal",

            // 🏛️ Union Territories
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli and Daman and Diu",
            "Delhi",
            "Jammu and Kashmir",
            "Ladakh",
            "Lakshadweep",
            "Puducherry",
        ],
        required: true,
    },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
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