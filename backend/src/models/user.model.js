const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:String,
    email: String,
    password: String,
    profilePic:String,
    address:String,
    isadmin:{type:Boolean,default:false},
    CartItems: [{type:mongoose.Schema.Types.ObjectId,ref:'product'}],
    CheckedOutProducts: [{type:mongoose.Schema.Types.ObjectId,ref:'product'}],
    DeliveredProducts: [{type:mongoose.Schema.Types.ObjectId,ref:'product'}]
})


const UserModel=mongoose.model('user',userSchema)

module.exports=UserModel