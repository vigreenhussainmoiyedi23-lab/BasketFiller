
const { comparePassword, HashPassword } = require('../utils/bcrypt')
const { GenerateToken } = require('../utils/jwt')
const UserModel = require('../models/user.model');
const { FindUser, CreateUser } = require('../services/user.service')

async function RegisterHandler(req, res) {

    // input from frontend

    const { email, password, username } = req.body
    // finding user

    const user = await FindUser({ email })
    if (user) return res.status(400).json({ message: 'User Already Exists' })
    // Creating user

    const HashedPassword = await HashPassword(password)
    const CreatedUser = await CreateUser({ email, username, password: HashedPassword })
    // generating token and setting the cookie
    delete CreatedUser.password
    // lean used in services

    const token = await GenerateToken(CreatedUser._id)

    res.cookie("token", token, {
        httpOnly: false,
        secure: true,          // true only if you serve over HTTPS
        sameSite: "none",       // required for cross-site cookies
        maxAge: 7 * 24 * 3600 * 1000, // 7 days
    });
    res.status(200).json({ success: true, message: 'Registered Succesfully', user: CreatedUser })
}

async function LoginHandler(req, res) {
    // taking input and finding user based on that
    try {

        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) return res.status(400).json({ message: 'Incorrect Email or Password' })

        // Verifying the password
        const result = await comparePassword(password, user.password)
        if (!result) return res.status(400).json({ message: 'Incorrect Email or Password' })

        // settting up token and cookie

        const token = await GenerateToken(user?._id)
        delete user.password
        res.cookie("token", token, {
            httpOnly: false,
            secure: true,          // true only if you serve over HTTPS
            sameSite: "none",       // required for cross-site cookies
            maxAge: 7 * 24 * 3600 * 1000, // 7 days
        });
        res.status(200).json({ success: true, message: 'Logged In Succesfully', user })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}


function LogoutHandler(req, res) {
    res.clearCookie('token')
    res.status(200).json({ message: 'user Logged Out succesfully' })
}


module.exports = { LoginHandler, LogoutHandler, RegisterHandler }