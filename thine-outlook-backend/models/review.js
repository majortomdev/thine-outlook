const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: true },
    content: { type: String, required: true},
    reviewer: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Review', reviewSchema);