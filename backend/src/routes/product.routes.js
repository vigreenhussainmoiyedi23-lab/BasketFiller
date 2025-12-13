const express = require('express')
const Router = express.Router()
// utils
const { productValidation, validate } = require('../utils/express-validator')

// middlewares
const productUploadMiddleware = require('../middlewares/ProductUpload')
const { isadmin } = require('../middlewares/AdminMiddleware')
const { ProductIndexHandler, ProductMoreHandler, CreateHandler, EditHandler, DeleteHandler, FilterHandler } = require('../controllers/product.controllers')

// Common Routes
Router.get('/', ProductIndexHandler)
Router.get('/more/:id', ProductMoreHandler)
Router.get('/filter', FilterHandler);

// Admin only routes Protected routes
Router.post('/create', isadmin, productUploadMiddleware, productValidation, validate, CreateHandler);
Router.post('/edit/:id', isadmin, EditHandler );
Router.post('/delete/:id', isadmin, DeleteHandler)


module.exports = Router