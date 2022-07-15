const HighScore = require('../models/highScoreModel')

const getScores = () => {
    try {
        const scores =  HighScore.find({});
        const sortedScores = scores.sort('-score')
        return sortedScores
        
    } catch (err) {
        console.log(err.message)
    }
    
}

const addScore = (score) => {
    score.save()
}

module.exports = {
    getScores,
    addScore
}