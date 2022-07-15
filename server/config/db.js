const mongoose = require('mongoose')
const HighScore = require('../models/highScoreModel')

const connectDB = async () => {
    try {
        const con = await mongoose.connect("mongodb+srv://jbagdonas:go2thezoo@cluster0.mdbmc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database!")
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB
