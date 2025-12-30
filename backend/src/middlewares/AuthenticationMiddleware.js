const { GenerateToken, VerifyToken } = require("../utils/jwt");
const { FindUser } = require("../services/user.service");
async function UserCanAuthenticate(req, res, next) {
  const token = req.cookies.token;
  const decoded = VerifyToken(token);
  res.clearCookie();
  if (decoded)
    return res.status(400).json({
      success: false,
      redirectTo: "/",
      message: "you are already Logged In",
    });
  next();
}

async function UserCanAcces(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({
        success: false,
        redirectTo: "/login",
        message: "Unauthorized Access",
      });
    const decoded = VerifyToken(token);
    if (!decoded)
      return res.status(401).json({
        success: false,
        redirectTo: "/login",
        message: "Unauthorized Access",
      });
    const user = await FindUser({ _id: decoded.id });
    if (!user)
      return res
        .status(500)
        .json({ message: "User Not Found", redirectTo: "/login" });
    if (user.isBanned) {
      return res.status(403).json({ message: "u are banned by the admin" });
    }
    req.user = user;
    next();
  } catch (error) {}
}

module.exports = { UserCanAcces, UserCanAuthenticate };
