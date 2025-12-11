const mongoose = require('mongoose')


const adminSchema = mongoose.Schema({
    username:String,
    email: String,
    password: String,
    profilePic:String,
    address:String,
    isadmin:{type:Boolean,default:true},
    // users checked out products
    CheckedOutProducts: [{type:mongoose.Schema.Types.ObjectId,ref:'product'}],
    // products mark delivered by admin
    DeliveredProducts: [{type:mongoose.Schema.Types.ObjectId,ref:'product'}]
})


const adminModel=mongoose.model('admin',adminSchema)

module.exports=adminModel