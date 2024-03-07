const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    //id: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    userName: { type: String, required: true},
    password: { type: String, required: true, minlength: 8},
    reviews: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Review' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);