const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    content: { type: String, required: true},
    reviewer: { type: String, required: true}
});

module.exports = mongoose.model('Review', reviewSchema);