const express = require('express');
const router = express.Router();
const { UserCanAcces } = require('../middlewares/AuthenticationMiddleware');
const productModel = require('../models/product.model');

router.post('/create/:Productid', UserCanAcces, async (req, res) => {
    const { title, description, rating } = req.body;

    const product = await productModel.findById(req.params.Productid);
    if (!product)
        return res.status(404).json({ message: "Product not found" });

    product.comments.unshift({
        title,
        description,
        rating,
        User: req.user._id,
    });

    await product.save();
    res.status(201).json({ message: "Review created successfully" });
});
router.post('/user/:Productid', UserCanAcces, async (req, res) => {
    const product = await productModel.findById(req.params.Productid);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const userReviews=await product.comments.map(c=>{
        if (c.User.toString() ===req.user._id.toString()) {
            return c
        }
    })
    res.status(201).json({ message: "User reviews Sent successfully",userReviews });
});

router.post('/edit/:Productid/:CommentId', UserCanAcces, async (req, res) => {
    const product = await productModel.findById(req.params.Productid);
    if (!product)
        return res.status(404).json({ message: "Product not found" });

    const idx = product.comments.findIndex(
        c => c._id.toString() === req.params.CommentId
    );

    if (idx === -1)
        return res.status(404).json({ message: "Comment not found" });

    const { title, description, rating } = req.body;

    product.comments[idx].title = title;
    product.comments[idx].description = description;
    product.comments[idx].rating = rating;

    await product.save();
    res.status(200).json({ message: "Review updated successfully" });
});

router.post('/delete/:Productid/:CommentId', UserCanAcces, async (req, res) => {
    const product = await productModel.findById(req.params.Productid);
    if (!product)
        return res.status(404).json({ message: "Product not found" });

    const idx = product.comments.findIndex(
        c => c._id.toString() === req.params.CommentId
    );

    if (idx === -1)
        return res.status(404).json({ message: "Comment not found" });

    product.comments.splice(idx, 1);
    await product.save();

    res.status(200).json({ message: "Review deleted successfully" });
});


module.exports = router;