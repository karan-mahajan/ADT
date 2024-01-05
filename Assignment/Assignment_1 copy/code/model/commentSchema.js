const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commenterName: String,
    text: String,
    blogID: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
}, {
    timestamps: true
})

module.exports = mongoose.model('Comments', commentSchema);