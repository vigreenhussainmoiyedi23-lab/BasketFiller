const express = require('express');
const router = express.Router();
const { UserCanAcces } = require('../middlewares/AuthenticationMiddleware');
const { addToCartHandler, RemoveFromCartHandler, IncreaseQuantityHandler, DecreaseQuantityHandler } = require('../controllers/cart.controllers');
const UserModel = require('../models/user.model');

router.get('/', UserCanAcces, async (req, res) => {
    const user = await UserModel.findById(req.user._id).populate("CartItems.product").lean();
    res.status(200).json({ message: "Cart route working", cartItems: user.CartItems })
})
router.get('/:productId', UserCanAcces, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);
        const ProductInCart=await user.CartItems.find(n=>n.product._id.toString()===req.params.productId.toString())
        if (ProductInCart) return res.status(200).json({ message: "Product Is In the cart",inCart:true })
        else {
            return res.status(200).json({ message: "Product is not in cart",inCart:false })
        }
    } catch (error) {
        console.error(error)
    }
})

router.post('/add/:productId', UserCanAcces, addToCartHandler)
router.post('/remove/:productId', UserCanAcces, RemoveFromCartHandler)
router.post('/increase/:productId', UserCanAcces, IncreaseQuantityHandler)
router.post('/decrease/:productId', UserCanAcces, DecreaseQuantityHandler)


module.exports = router;