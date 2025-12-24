const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilePic: String,
    fileId: String,
    isBanned: { type: Boolean, default: false },
    isadmin: { type: Boolean, default: false },
    CartItems: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }, quantity: { type: Number, default: 1 } }],
    Orders: [{
        order: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
        status: { type: String, enum: ["checkedOut", "delivered"], default: "checkedOut" },
    }],
}, { timestamps: true })


const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel