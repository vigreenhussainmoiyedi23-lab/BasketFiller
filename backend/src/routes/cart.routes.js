const express = require('express');
const router = express.Router();



const productModel = require('../models/product.model');
const UserModel = require('../models/user.model');
const { UserCanAcces } = require('../middlewares/AuthenticationMiddleware');


router.post('/add/:productId', UserCanAcces, async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user._id })
        const product = await productModel.findOne({ _id: req.params.productId }).lean()
        const productInCartAlready = user.CartItems.find(
            (item) => item.product.toString() === product._id.toString()
        );

        if (productInCartAlready) {
            return res.status(400).json({ message: "Product already in cart" });
        }

        user.CartItems.unshift({ product: product._id })
        await user.save()
        res.status(200).json({ message: "Product added to cart successfully", cartItems: user.CartItems })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})

router.post('/remove/:productId', UserCanAcces, async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user._id })
        const product = await productModel.findOne({ _id: req.params.productId }).lean()
        const idx = user.CartItems.findIndex(item => item.product.toString() === product._id.toString());
        if (idx === -1) {
            return res.status(400).json({ message: "Product not found in cart" })
        }
        user.CartItems.splice(idx, 1)
        await user.save()
        res.status(200).json({ message: "Product removed from cart successfully", idx: idx, cartItems: user.CartItems })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})





module.exports = router;