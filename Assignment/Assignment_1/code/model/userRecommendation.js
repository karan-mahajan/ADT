const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRecommendationSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    recommendation: Number,
    author: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('UserRecommendation', userRecommendationSchema);