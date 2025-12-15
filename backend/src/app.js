//___requiring essential packages____
const express=require('express')
const app=express()
const cors=require('cors')
const cookieParser=require('cookie-parser')

// requiring Middlewares
const {UserCanAcces}=require('./middlewares/AuthenticationMiddleware')
const adminUrl='http://localhost:5174'
const userUrl='http://localhost:5173'

// _______requiring all the routers____
const authRoutes=require('./routes/auth.routes')
const userRoutes=require('./routes/user.routes')
const adminRoutes=require('./routes/admin.routes')
const productRoutes=require('./routes/product.routes')
const cartRoutes=require('./routes/cart.routes')
//_______Middlewares_______
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:[adminUrl,userUrl],credentials:true}))

//_______routes_______
app.use('/api/auth',authRoutes)
app.use('/api/user',UserCanAcces,userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)

module.exports=app