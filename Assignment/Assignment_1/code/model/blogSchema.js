const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    authorName: String,
    categories: [String],
    tags: [String],
}, {
    timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema);