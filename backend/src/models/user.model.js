const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:String,
    email: String,
    password: String,
    profilePic:String,
    address:String,
    isadmin:{type:Boolean,default:false},
    CartItems: [{type:mongoose.Schema.Types.ObjectId,ref:'product'}],
    CheckedOutOrders: [{type:mongoose.Schema.Types.ObjectId,ref:'order'}],
    DeliveredOrders: [{type:mongoose.Schema.Types.ObjectId,ref:'order'}]
})


const UserModel=mongoose.model('user',userSchema)

module.exports=UserModel