const productModel = require('../models/product.model');
const UserModel = require('../models/user.model');
const { GetProductUserAndIndex,QuantityHandler} = require('../utils/cart.utils');

async function addToCartHandler(req, res) {
    try {
        const { user, product, idx } = await GetProductUserAndIndex(req.user._id, req.params.productId);
        if (idx > -1) {
            return res.status(400).json({ message: "Product already in cart" });
        }
        user.CartItems.unshift({ product: product._id })
        await user.save()
        res.status(200).json({ message: "Product added to cart successfully", cartItems: user.CartItems })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}

async function RemoveFromCartHandler(req, res) {
    try {
        const { user, product, idx } = await GetProductUserAndIndex(req.user._id, req.params.productId);
        if (idx === -1) {
            return res.status(400).json({ message: "Product not found in cart" })
        }
        user.CartItems.splice(idx, 1)
        await user.save()
        res.status(200).json({ message: "Product removed from cart successfully", idx: idx, cartItems: user.CartItems })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}

async function IncreaseQuantityHandler(req, res) {
    try {
        const { user, product, idx } = await GetProductUserAndIndex(req.user._id, req.params.productId);
        if (idx === -1) {
            return res.status(400).json({ message: "Product not found in cart" })
        }
        const {user:UpdatedUser}=await QuantityHandler('increase', idx, user);
        res.status(200).json({ message: "Quantity incresed of the product successfully", success:true, cartItems: UpdatedUser.CartItems })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}

async function DecreaseQuantityHandler(req, res) {
    try {
        const { user, product, idx } = await GetProductUserAndIndex(req.user._id, req.params.productId);
        if (idx === -1) {
            return res.status(400).json({ message: "Product not found in cart" })
        }
       const {removed,user:UpdatedUser}=await QuantityHandler('decrease', idx, user);
       if(removed){
        return res.status(200).json({ message: "Product removed from cart as quantity reached zero", cartItems: UpdatedUser.CartItems })
       }
        res.status(200).json({ message: "Quantity decreased of the product succesfully successfully", idx: idx, cartItems: UpdatedUser.CartItems })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}

module.exports = {
    addToCartHandler, RemoveFromCartHandler, IncreaseQuantityHandler, DecreaseQuantityHandler

}