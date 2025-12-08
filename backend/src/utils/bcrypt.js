const bcrypt=require('bcrypt')

async function HashPassword(password) {
    const hashedPassword=await bcrypt.hash(password,10)
    return hashedPassword
}
function comparePassword(PlainTextPassword,DatabasePassword) {
    const result=bcrypt.compare(PlainTextPassword,DatabasePassword)
    return result
}
module.exports={
    comparePassword,
    HashPassword
}