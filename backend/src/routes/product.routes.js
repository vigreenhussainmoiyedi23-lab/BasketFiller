const express = require('express')
const Router = express.Router()
// utils
const { productValidation, validate } = require('../utils/express-validator')

// middlewares
const productUploadMiddleware = require('../middlewares/ProductUpload')
const { isadmin } = require('../middlewares/AdminMiddleware')
const { ProductIndexHandler, ProductMoreHandler, CreateHandler, EditHandler, DeleteHandler, FilterHandler } = require('../controllers/product.controllers')
const productModel = require('../models/product.model')
const { VerifyToken } = require('../utils/jwt')
const UserModel = require('../models/user.model')
// /api/product
// Common Routes
Router.get('/', ProductIndexHandler)
Router.get('/featured', async (req, res) => {
    const latestProducts = await productModel.find().sort({ createdAt: -1 }).limit(12)
    let categories = []
    const token = req.cookies?.token
    if (!token) {
        const featuredProducts = await productModel.find().sort({ createdAt: -1 }).limit(12)
        return res.status(200).json({ message: "Here is the feauturedProducts", featuredProducts })
    }
    const { id } = VerifyToken(token)
    const user = await UserModel.findById(id)
        .populate({
            path: "CartItems.product",
        })
        .populate({
            path: "Orders.order",
            populate: {
                path: "products.product",
            },
        });
    if (!user || !user.CartItems.length > 0 || !user.Orders.length > 0) {
        const featuredProducts = await productModel.find().sort({ createdAt: -1 }).limit(12)
        return res.status(200).json({ message: "Here is the feauturedProducts", featuredProducts })
    }
    if (user.CartItems.length > 0) {
        categories = [...new Set(user.CartItems.map(item => item.product.categoury))];
    }
    else if (user.Orders.length > 0) {
        categories = new Set(user.Orders.map(n => n.order.products.map(item => item.product.categoury)));
    }
    let featuredProducts = await productModel.aggregate([
        {
            $match: { categoury: { $in: categories } }

        }
        , {
            $addFields: {
                rating: { $ifNull: [{ $avg: "$comments.rating" }, 0] }
            }
        },
        {
            $addFields: {
                finalPrice: {
                    $multiply: ["$price",
                        {
                            $divide: [{ $subtract: [100, "$discount"] }, 100]
                        }]
                }
            }
        }
        , {
            $limit: 12
        }
    ])
    if (featuredProducts.length < 5) {
        featuredProducts = [...featuredProducts, ...latestProducts.slice(-5 + featuredProducts.length)]
    }
    return res.status(200).json({ message: "Here is the feauturedProducts", featuredProducts })
})

Router.get('/categouryEnum', async (req, res) => {
    const categouryEnum = await productModel.schema.path("categoury").enumValues
    res.status(200).json({ message: "succesfully fetched all enum values", categouryEnum })
})
Router.get('/more/:id', ProductMoreHandler)
Router.post('/filter', FilterHandler);

// Admin only routes Protected routes
Router.post('/create', isadmin, productUploadMiddleware, productValidation, validate, CreateHandler);
Router.post('/edit/:id', isadmin, EditHandler);
Router.get('/delete/:id', isadmin, DeleteHandler)


module.exports = Router