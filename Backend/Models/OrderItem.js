const mongoose = require('mongoose')

const OrderItemsSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const OrderItems = mongoose.model('orderItem', OrderItemsSchema);

module.exports = OrderItems;