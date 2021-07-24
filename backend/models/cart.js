const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    mainCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Main Category id required"]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Category id required"]
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Sub-Category id required"]
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product id required"]
    },
    choice: {
        type: String,
        required: [true, "Need to provide choice"]
    },
    quantity: {
        type: Number,
        required: [true, "Need to provide quantity"],
        min: [1, 'Quantity cannot be less than 1.']
    },
}, {
    timestamps: true
});

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    products: [productSchema],
}, {
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;