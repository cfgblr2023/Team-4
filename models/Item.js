const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    reqStock: {
        type: Number,
        required: true,
        default: 0
    },
    imgUrl: {
        type: String,
        default: undefined
    },
    imgPubId: {
        type: String,
        default: undefined
    }
});

module.exports = mongoose.model('Item', itemSchema);
