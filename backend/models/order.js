const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productOrderSchema = new Schema({

});

const orderSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    pastOrder: [productOrderSchema],

    currentOrder: [productOrderSchema]



},{
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;