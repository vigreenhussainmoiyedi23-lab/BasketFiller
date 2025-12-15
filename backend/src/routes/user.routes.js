const express = require('express');
const router = express.Router();

// configs
const upload = require('../config/multer');
// Controllers
const { ProfileHandler, ProfileEditHandler, ProfileSecurityHandler, ContactUsHandler } = require("../controllers/user.controllers");
const productModel = require('../models/product.model');
const UserModel = require('../models/user.model');
const { UserCanAcces } = require('../middlewares/AuthenticationMiddleware');

router.get('/profile', UserCanAcces, ProfileHandler);
router.post('/profile/edit/:id', UserCanAcces, upload.single('profilePic'), ProfileEditHandler);
router.post('/profile/security/:id', UserCanAcces, ProfileSecurityHandler)
router.post('/contactus', ContactUsHandler);
router.post('/cart/add/:productId', UserCanAcces, async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user._id })
        const product = await productModel.findOne({ _id: req.params.productId }).lean()
        const productInCartAlready = user.CartItems.filter(item => item.id === product._id)
        if (productInCartAlready) return res.status(400).json({ message: "Product already in cart" })
        user.CartItems.unshift(product._id)
        await user.save()
        res.status(200).json({ message: "Product added to cart successfully", cartItems: user.CartItems })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})
router.post('/cart/increase/:productId', UserCanAcces, async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user._id })
        const product = await productModel.findOne({ _id: req.params.productId }).lean()
        const IncreaseQuantity = await user.CartItems.map(item => {
            if (item.id === product._id) {
                return {...item,quantity:item.quantity += 1}
            }
            else{
                return item
            }
        })
        user.CartItems = IncreaseQuantity
        await user.save()
        res.status(200).json({ message: "Quantity Increased successfully", cartItems: user.CartItems })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})


module.exports = router;