const express = require('express')
const productModel = require('../models/product.model')
const upload = require('../config/multer')
const productUploadMiddleware = require('../middlewares/ProductUpload')
const Router = express.Router()

Router.get('/', async (req, res) => {

    try {
        const products = await productModel.find().lean()
        res.status(200).json({ message: "products are here", products })

    } catch (error) {

    }
})

Router.post('/create', productUploadMiddleware, async (req, res) => {
    // req.files will be an object containing arrays for each field
    const thumbnailFile = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
    const productImagesFiles = req.files['productImages'] || [];
    const { title, price, discount, description } = req.body
    if (!thumbnailFile || productImagesFiles.length === 0) {
        return res.status(400).json({ message: 'Both thumbnail and product images are required.' });
    }

    try {
        // Upload thumbnail to ImageKit
        const thumbnailUpload = await imagekit.upload({
            file: thumbnailFile.buffer,
            fileName: thumbnailFile.originalname,
            folder: 'product_thumbnails',
        });

        // Upload product images to ImageKit concurrently
        const imagesUploadPromises = productImagesFiles.map(file =>
            imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
                folder: 'product_images',
            })
        );
        const imagesUploadResults = await Promise.all(imagesUploadPromises);

        // Extract URLs
        const thumbnailUrl = thumbnailUpload.url;
        const imageUrls = imagesUploadResults.map(result => result.url);

        const createdProduct=await productModel.create({
            title,
            description,
            price,
            discount,
            thumbanail:thumbnailUrl,
            Photos:imageUrls
        })
        res.status(200).json({
            message: 'Upload successful',
            thumbnailUrl,
            imageUrls
        });

    } catch (error) {
        console.error("ImageKit upload error:", error);
        res.status(500).json({ message: 'Error uploading files to ImageKit' });
    }
});


module.exports = Router