const express = require('express')
const Router = express.Router()
// utils
const { productValidation, validate } = require('../utils/express-validator')

// middlewares
const productUploadMiddleware = require('../middlewares/ProductUpload')
const { isadmin } = require('../middlewares/AdminMiddleware')
const { ProductIndexHandler, ProductMoreHandler, CreateHandler, EditHandler, DeleteHandler, FilterHandler } = require('../controllers/product.controllers')
const productModel = require('../models/product.model')
// /api/product
// Common Routes
Router.get('/', ProductIndexHandler)

Router.get('/categouryEnum',async (req,res)=>{
    const categouryEnum=await productModel.schema.path("categoury").enumValues
    res.status(200).json({message:"succesfully fetched all enum values",categouryEnum})
})
Router.get('/more/:id', ProductMoreHandler)
Router.post('/filter', FilterHandler);

// Admin only routes Protected routes
Router.post('/create', isadmin, productUploadMiddleware, productValidation, validate, CreateHandler);
Router.post('/edit/:id', isadmin, EditHandler);
Router.get('/delete/:id', isadmin, DeleteHandler)


module.exports = Router