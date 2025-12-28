// models
const productModel = require("../models/product.model");
// configs
const imagekit = require("../config/Imagekit");

async function ProductIndexHandler(req, res) {
  // inedx means /api/products
  try {
    const products = await productModel.find().lean();
    res.status(200).json({ message: "products are here", products });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product details",
      error: error.message,
    });
  }
}
async function ProductMoreHandler(req, res) {
  try {
    const product = await productModel
      .findOne({ _id: req.params.id })
      .populate({ path: "comments.User", select: "username" });
    if (!product)
      return res.status(404).json({ message: "Invalid Id : No product Found" });
    return res.status(200).json({ message: "Here is the details", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
}

async function FilterHandler(req, res) {
  try {
    const {
      minPrice,
      maxPrice,
      sortBy,
      category,
      search,
      page,
      instock,
      rating,
    } = req.body;
    const pipeline = [];
    let limit = 10;
    let skip = 0;
    page ? (skip = (Number(page) - 1) * limit) : (skip = 0);
    if (category) {
      pipeline.push({
        $match: {
          categoury: category,
        },
      });
    }
    if (search) {
      pipeline.push({
        $match: {
          title: { $regex: search, $options: "i" },
        },
      });
    }
    // adding two virtual feilds
    pipeline.push({
      $addFields: {
        finalPrice: {
          $round: [
            {
              $multiply: [
                "$price",
                {
                  $divide: [{ $subtract: [100, "$discount"] }, 100],
                },
              ],
            },
            2,
          ],
        },
      },
    });
    pipeline.push({
      $addFields: {
        rating: { $round: [{ $ifNull: [{ $avg: "$comments.rating" }, 0] }, 2] },
      },
    });

    if (minPrice) {
      let min = minPrice;
      if (!minPrice) min = 0;
      pipeline.push({
        $match: {
          finalPrice: {
            $gte: min,
          },
        },
      });
    }
    if (maxPrice) {
      let max = maxPrice;
      if (!maxPrice) max = 100000;
      pipeline.push({
        $match: {
          finalPrice: {
            $lte: max,
          },
        },
      });
    }
    if (sortBy) {
      console.log(sortBy);
      if (sortBy === "price-asc") {
        pipeline.push({
          $sort: {
            finalPrice: 1,
          },
        });
      } else if (sortBy === "price-desc") {
        pipeline.push({
          $sort: {
            finalPrice: -1,
          },
        });
      } else if (sortBy === "rating-desc") {
        pipeline.push({
          $sort: {
            rating: -1,
          },
        });
      } else {
        pipeline.push({
          $sort: {
            createdAt: -1,
          },
        });
      }
    }
    if (instock) {
      pipeline.push({
        $match: {
          stock: { $gt: 0 },
        },
      });
    }
    if (rating) {
      pipeline.push({
        $match: {
          rating: { $gte: rating },
        },
      });
    }
    pipeline.push({
      $skip: skip,
    });
    pipeline.push({
      $limit: limit,
    });
    const products = await productModel.aggregate(pipeline);
    const totalProducts = await productModel.countDocuments(pipeline);
    res.status(200).json({
      message: "Filtered results",
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error filtering products", error: error.message });
  }
}

async function DeleteHandler(req, res) {
  try {
    const deletedProduct = await productModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product Deleted Successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "error deleting the user", error });
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

    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function CreateHandler(req, res) {
  // req.files will be an object containing arrays for each field
  const thumbnailFile = req.files["thumbnail"]
    ? req.files["thumbnail"][0]
    : null;
  const productImagesFiles = req.files["productImages"] || [];
  const { title, stock, price, discount, description, categoury } = req.body;

  if (!thumbnailFile || productImagesFiles.length === 0) {
    return res
      .status(400)
      .json({ message: "Both thumbnail and product images are required." });
  }
  try {
    // Upload thumbnail to ImageKit
    const thumbnailUpload = await imagekit.upload({
      file: thumbnailFile.buffer,
      fileName: thumbnailFile.originalname,
      folder: "product_thumbnails",
    });
    // Upload product images to ImageKit concurrently
    const imagesUploadPromises = productImagesFiles.map((file) =>
      imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "product_images",
      })
    );
    const imagesUploadResults = await Promise.all(imagesUploadPromises);

    // Extract URLs
    const thumbnailUrl = thumbnailUpload.url;
    const imageUrls = imagesUploadResults.map((result) => result.url);

    const createdProduct = await productModel.create({
      title,
      description,
      price,
      stock,
      discount,
      categoury,
      thumbnail: thumbnailUrl,
      photos: imageUrls,
    });
    res.status(200).json({
      message: "Upload successful",
      product: createdProduct,
    });
  } catch (error) {
    console.error("ImageKit upload error:", error);
    res.status(500).json({ message: "Error uploading files to ImageKit" });
  }
}

module.exports = {
  ProductIndexHandler,
  ProductMoreHandler,
  EditHandler,
  CreateHandler,
  DeleteHandler,
  FilterHandler,
};
