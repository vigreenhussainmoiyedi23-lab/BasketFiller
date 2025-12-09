const { GenerateToken, VerifyToken } = require('../utils/jwt')
const { FindUser } = require('../services/user.service')
async function UserCanAuthenticate(req, res, next) {
    const token = req.cookies.token
    const decoded = VerifyToken(token)
    if (decoded) return res.status(400).json({ success: false, redirectTo: '/', message: 'you are already Logged In' })
    next()
}

async function UserCanAcces(req, res, next) {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ success: false, redirectTo: '/login', message: 'Unauthorized Access' })
    const decoded = VerifyToken(token)
    if (!decoded) return res.status(401).json({ success: false, redirectTo: '/login', message: 'Unauthorized Access' })
    const user = await FindUser({ _id: decoded.id })
    if (!user) return req.status(500).json({ message: "Something Went Wrong" })
        
    req.user = user
    next()
}

module.exports = { UserCanAcces, UserCanAuthenticate }