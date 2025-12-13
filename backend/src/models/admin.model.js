const mongoose = require('mongoose')


const adminSchema = mongoose.Schema({
    email: String,
    password: String,
    isadmin:{type:Boolean,default:true},
})


const adminModel=mongoose.model('admin',adminSchema)

module.exports=adminModel