const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
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

module.exports = mongoose.model('Campaign', campaignSchema);
