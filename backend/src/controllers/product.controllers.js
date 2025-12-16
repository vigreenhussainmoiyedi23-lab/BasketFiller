// models
const productModel = require('../models/product.model')
// configs
const imagekit = require("../config/Imagekit");



async function ProductIndexHandler(req, res) {
    // inedx means /api/products
    try {
        const products = await productModel.find().lean()
        res.status(200).json({ message: "products are here", products })

    } catch (error) {
        res.status(500).json({ message: "Error fetching product details", error: error.message });
    }

}
async function ProductMoreHandler(req, res) {
    try {
        const product = await productModel.findOne({ _id: req.params.id }).lean()
        if (!product) return res.status(404).json({ message: "Invalid Id : No product Found" })
        return res.status(200).json({ message: "Here is the details", product })
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
}

async function FilterHandler(req, res) {
    try {
        const { priceRange, sort, category, search, page } = req.body;
        const pipeline = []
        let limit = 12;
        let skip = 0
        page ? skip = (Number(page) - 1) * limit : skip = 0;
        if (category) {
            pipeline.push({
                $match: {
                    categoury: category
                }
            })
        }
        if (search) {
            pipeline.push({
                $match: {
                    title: { $regex: search, $options: 'i' }
                }
            })
        }

        pipeline.push({
            $addFields: {
                finalPrice: {
                    $multiply: ["$price",
                        {
                            $divide: [{$subtract: [100, "$discount"]} , 100]
                        }]
                }
            }
        })

        if (priceRange) {
            let [min, max] = priceRange
            if (!max) max = 100000;
            if (!min) min = 0;
            pipeline.push({
                $match: {
                    finalPrice: {
                        $gte: min,
                        $lte: max,
                    }
                }
            })
        }

        if (sort) {
            if (sort === "lowToHigh") {
                pipeline.push({
                    $sort: {
                        finalPrice: 1
                    }
                })
            } else {
                pipeline.push({
                    $sort: {
                        finalPrice: -1
                    }
                })
            }
        }

        pipeline.push({
            $skip: skip,
           
        })
        pipeline.push({
          $limit: limit
        })
        console.log(pipeline)

        const products = await productModel.aggregate(pipeline)
        res.status(200).json({ message: 'Filtered results', count: products.length, products });
    } catch (error) {
        res.status(500).json({ message: 'Error filtering products', error: error.message });
    }
}


async function DeleteHandler(req, res) {
    try {
        const deletedProduct = await productModel.findOneAndDelete({ _id: req.params.id })
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product Deleted Successfully", success: true })
    } catch (error) {
        return res.status(500).json({ message: "error deleting the user", error })
    }
}

async function EditHandler(req, res) {
    try {
        const { title, stock, price, discount, description, categoury } = req.body;

        // Find product by ID
        const product = await productModel.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(400).json({ message: "Invalid ID: Product not found" });
        }
        if (!title && !price && !discount && !description) {
            return res.status(400).json({ message: "No fields provided for update" });
        }
        // Update only provided fields
        if (title) product.title = title;
        if (price) product.price = price;
        if (discount) product.discount = discount;
        if (description) product.description = description;
        if (stock) product.stock = stock;
        if (categoury) product.categoury = categoury;

        // Save updated product
        await product.save();

        return res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function CreateHandler(req, res) {
    // req.files will be an object containing arrays for each field
    const thumbnailFile = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
    const productImagesFiles = req.files['productImages'] || [];
    const { title, stock, price, discount, description, categoury } = req.body

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
        console.log(thumbnailUpload)
        // Upload product images to ImageKit concurrently
        const imagesUploadPromises = productImagesFiles.map(file =>
            imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
                folder: 'product_images',
            })
        );
        const imagesUploadResults = await Promise.all(imagesUploadPromises);
        console.log(imagesUploadResults)

        // Extract URLs
        const thumbnailUrl = thumbnailUpload.url;
        const imageUrls = imagesUploadResults.map(result => result.url);

        const createdProduct = await productModel.create({
            title,
            description,
            price,
            stock,
            discount,
            categoury,
            thumbnail: thumbnailUrl,
            photos: imageUrls
        })
        res.status(200).json({
            message: 'Upload successful',
            product: createdProduct
        });

    } catch (error) {
        console.error("ImageKit upload error:", error);
        res.status(500).json({ message: 'Error uploading files to ImageKit' });
    }
}


module.exports = {
    ProductIndexHandler,
    ProductMoreHandler,
    EditHandler,
    CreateHandler,
    DeleteHandler,
    FilterHandler
}