const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    mobile: Number,
    dob: Date,
    email: {
        type: String,
        unique: true
    },
    registrationDate: { type: Date, default: Date.now }
},)

module.exports = mongoose.model('User', userSchema);