const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String,
    photos: [{ type: String }],
    price: Number,
    stock: { type: Number, default: 0 },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    createdAt: { type: Date, default: Date.now },
    comments: [{
        title: String,
        description: String,
        rating: { type: Number, min: 0, max: 5, default: 5 },
        User: {
            type: mongoose.Schema.Types.ObjectId, ref: 'user'
        },
        CreatedAt: {
            type: Date,
            default: Date.now
        }
    }],
    categoury: [
        {
            type: String,
            enum: [
                'electronics',
                'fashion',
                'home-appliances',
                'books',
                'groceries',
                'beauty-products',
                'toys',
                'sports',
                'automotive',
                'furniture',
                'jewelry',
                'Other',
            ],
            default: 'Other',
        }
    ]
}, {
    toJSON: { virtuals: true }  // 👈 important
})

productSchema.virtual('finalPrice').get(function () {
    return this.price - (this.price * this.discount) / 100;
});

const productModel = mongoose.model('product', productSchema)

module.exports = productModel