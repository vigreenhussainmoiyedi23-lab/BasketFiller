const express = require('express')
const adminModel = require('../models/admin.model')
const { HashPassword, comparePassword } = require('../utils/bcrypt')
const { GenerateToken } = require('../utils/jwt')
const Router = express.Router()
const { isadmin } = require('../middlewares/AdminMiddleware')
const { LoginValidator, validate } = require('../utils/express-validator')
const UserModel = require('../models/user.model')
const orderModel = require('../models/order.model')

Router.post('/revenue/:type', isadmin, async (req, res) => {
   const {type}=req.params
    if (!["monthly", "daily", "yearly"].includes(type)) res.status(400).json({ message: "Invalid revenue type" })

    res.status(200).json({ message: "Just A revenue give" })
})

Router.get('/all', async function GetAllUserHandler(req, res) {
    try {

        const users = await UserModel.find().populate("Orders.order").populate("CartItems.product")
        if (users?.length == 0)
            return res.status(404).json({ message: "No Users Found" })
        res.status(200).json({ message: "All Users Data", users })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error })
    }
});
// Banning the user
Router.post('/user/ban/:id', async function GetAllUserHandler(req, res) {
    try {

        const user = await UserModel.findOne({ _id: req.params.id }).populate("Orders.order").populate("CartItems.product")
        if (!user)
            return res.status(404).json({ message: "No Users Found" })
        user.isBanned = true
        await user.save()
        res.status(200).json({ message: "User Banned Succesfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error })
    }
});
// UnBanning the user
Router.post('/user/unban/:id', async function GetAllUserHandler(req, res) {
    try {

        const user = await UserModel.findOne({ _id: req.params.id }).populate("Orders.order").populate("CartItems.product")
        if (!user)
            return res.status(404).json({ message: "No Users Found" })
        user.isBanned = false
        await user.save()
        res.status(200).json({ message: "User Banned Succesfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error })
    }
});

Router.post('/login', LoginValidator, validate, async (req, res) => {
    const { email, password } = req.body
    const admin = await adminModel.findOne({ email }).lean()
    if (!admin) return res.status(401).json({ message: "Incorrect Credentials" })
    const result = await comparePassword(password, admin.password)
    if (!result) return res.status(401).json({ message: "Incorrect Credentials" })
    const token = await GenerateToken(admin._id)
    res.cookie('token', token)
    res.status(200).json({ message: "Logged In succesfully", redirectTo: '/' })
})
Router.post('/update', isadmin, async (req, res) => {
    const { oldPassword, oldEmail, newEmail, newPassword } = req.body
    const admin = await adminModel.findOne({ email: oldEmail })
    if (!admin) return res.status(403).json({ message: "Incorrect Credentials" })
    const result = await comparePassword(oldPassword, admin.password)
    if (!result) return res.status(403).json({ message: "Incorrect Credentials" })
    if (!oldEmail || !oldPassword) {
        res.status(401).json({ message: "Email or Password cannot be empty" })
    }
    const hashedPassword = await HashPassword(newPassword)
    admin.email = newEmail
    admin.password = hashedPassword
    await admin.save()
    res.status(200).json({
        message: 'admin Updated Succesfully',
        redirectTo: "/"
    })
})


module.exports = Router