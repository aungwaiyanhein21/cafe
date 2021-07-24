const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CupSizePriceSchema = new Schema({
    smallCupPrice: {
        type: Number
    },
    mediumCupPrice: {
        type: Number
    },
    largeCupPrice: {
        type: Number
    },
    otherPrice: {
        type: Number
    }
}, { _id : false });

const ProductsSchema = new Schema({
    productName: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },
    priceOption: {
        type: String
    },
    price: CupSizePriceSchema,
    imagePath: {
        type: String,
    } 
}, {
    timestamps: true,
});

const SubCategorySchema = new Schema({
    subCategoryName: {
        type: String,
    },
    products: [ProductsSchema]
}, {
    timestamps: true,
});

const CategorySchema = new Schema({
    categoryName: {
        type: String,
    },
    subCategories: [SubCategorySchema],
    imagePath: {
        type: String,
    }
}, {
    timestamps: true,
});

const MenuSchema = new Schema({
    mainCategoryName: {
        type: String,
        required: true,
        unique: true
    },
    categories: {
        type: [CategorySchema]
    }
}, {
    timestamps: true,
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;