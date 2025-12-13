const adminModel = require("../models/admin.model");
const { VerifyToken } = require("../utils/jwt");
async function isadmin(req, res, next) {
    try {
        const token = req.cookies.token
        if (!token) return res.status(401).json({ message: "Missing token", redirectTo: '/login' })
        const decoded = VerifyToken(token)
        if (!decoded) return res.status(401).json({ message: "Wrong Token", redirectTo: '/login' })
        const admin = await adminModel.findOne({ _id: decoded.id })
        if (!admin) {
            return res.status(403).json({ messgae: "you are not allowed over here", redirectTo: '/login' })
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong", errors: error, redirectTo: '/login' })
    }
}
module.exports = { isadmin }