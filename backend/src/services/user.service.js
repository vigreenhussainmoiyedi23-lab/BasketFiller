const mongoose=require('mongoose')
const UserModel = require('../models/user.model')

async function FindUser(params={}) {
const user=await UserModel.findOne(params).lean()
if(!user)return false
delete user.password
return user    
}
async function CreateUser(params={}) {
const user=await UserModel.create({...params })
if(!user)return false
return user.toObject()    
}

module.exports={FindUser,CreateUser}