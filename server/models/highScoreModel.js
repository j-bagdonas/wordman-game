const mongoose = require('mongoose')

const highScoreSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const HighScore = mongoose.model('HighScore', highScoreSchema)

module.exports = HighScore