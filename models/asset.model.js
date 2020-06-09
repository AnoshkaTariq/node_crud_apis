const mongoose = require('mongoose');

const Asset = mongoose.model('Asset', new mongoose.Schema(
    {
        title: String,
        content: String
    },
    { timestamps: true }
));

module.exports = Asset;