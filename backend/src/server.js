const app=require('./app')
require('dotenv').config()
const PORT=process.env.PORT || 5000
const connectDB=require('./config/db')
connectDB()
app.listen(PORT)