//___requiring essential packages____
const express=require('express')
const app=express()
const cors=require('cors')
const cookieParser=require('cookie-parser')

// requiring Middlewares
const {UserCanAcces}=require('./middlewares/AuthenticationMiddleware')


// _______requiring all the routers____
const authRoutes=require('./routes/auth.routes')
const userRoutes=require('./routes/user.routes')


//_______Middlewares_______
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:'http://localhost:5173',credentials:true}))

//_______routes_______
app.use('/api/auth',authRoutes)
app.use('/api/user',UserCanAcces,userRoutes)


module.exports=app