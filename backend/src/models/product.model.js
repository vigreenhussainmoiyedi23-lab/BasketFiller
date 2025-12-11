const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Thumbnail: String,
    Photos: [{ type: String }],
    price: Number,
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default:0,
    },
    comments: [{
        title: String,
        description: String,
        rating:{type:Number,min:0,max:5,default:5},
        User: {
            type: mongoose.Schema.Types.ObjectId, ref: 'user'
        },
        CreatedAt:{
            type:Date,
            default:Date.now
        }
    }]
}, {
    toJSON: { virtuals: true }  // 👈 important
})

productSchema.virtual('finalPrice').get(function () {
  return this.price - (this.price * this.discount) / 100;
});

const productModel = mongoose.model('product', productSchema)

module.exports = productModel