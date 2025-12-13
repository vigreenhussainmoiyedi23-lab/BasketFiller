const express = require('express')
const adminModel = require('../models/admin.model')
const { HashPassword, comparePassword } = require('../utils/bcrypt')
const { GenerateToken } = require('../utils/jwt')
const Router = express.Router()
const {isadmin}=require('../middlewares/AdminMiddleware')
const { LoginValidator,validate } = require('../utils/express-validator')

Router.get('/revenue',isadmin,(req,res)=>{
    res.status(200).json({message:"Just A revenue give"})
})

Router.post('/login',LoginValidator,validate, async (req, res) => {
    const { email, password } = req.body
    const admin = await adminModel.findOne({ email }).lean()
    if (!admin) return res.status(401).json({ message: "Incorrect Credentials" })
    const result = await comparePassword(password, admin.password)
    if (!result) return res.status(401).json({ message: "Incorrect Credentials" })
    const token = await GenerateToken(admin._id)
    res.cookie('token', token)
    res.status(200).json({ message: "Logged In succesfully", redirectTo: '/' })
})
// admin dets email=admin@company.com, password=admin@123
Router.post('/update',LoginValidator,validate,isadmin ,async (req, res) => {
    const { oldPassword, oldEmail, email, password } = req.body
    const admin = await adminModel.findOne({ email: oldEmail })
    if (!admin) return res.status(403).json({ message: "Incorrect Credentials" })
    const result = await comparePassword(oldPassword, admin.password)
    if (!result) return res.status(403).json({ message: "Incorrect Credentials" })
    if (!email || !password) {
        res.status(401).json({ message: "Email or Password cannot be empty" })
    }
    const hashedPassword = await HashPassword(password)
    admin.email = email
    admin.password = hashedPassword
    await admin.save()
    res.status(200).json({
        message: 'admin Updated Succesfully',
        redirectTo: "/"
    })
})


module.exports = Router