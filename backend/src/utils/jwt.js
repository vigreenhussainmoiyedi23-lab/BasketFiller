const jwt=require('jsonwebtoken')

async function GenerateToken(id) {
    const token=jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
    return token
}
function VerifyToken(token) {
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        return decoded
        
    } catch (error) {
        return null
    }
}

module.exports={
    GenerateToken,
    VerifyToken
}