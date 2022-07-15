const express = require('express')
const cors = require ('cors')
const fs = require('fs');
const wordListPath = require('word-list');
const connectDB  = require('./config/db');
const scores = require( './controllers/highScoreController');
const HighScore = require('./models/highScoreModel');
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n')
const bodyParser = require('body-parser')
const axios = require('axios');
const port = process.env.PORT;

const app = express()

var jsonParser = bodyParser.json()

app.use(cors())

connectDB();

const getRandomWord = () => {
    let randomIndex =  Math.floor(wordArray.length * Math.random())
    return JSON.stringify(wordArray[randomIndex])
}

app.get("/", (req, res)=>{

    let word = getRandomWord()
    while (word.length > 12){
        word = getRandomWord()
    }
    res.send(word)  
})

app.post("/addScore", jsonParser, async (req, res, next) => {
  const data = {
    name : req.body.name,
    score : req.body.score
  }
  try{
    const response = await axios.get(`https://www.purgomalum.com/service/containsprofanity?text=${data.name}`)
    if(response.data === true){
      res.sendStatus(406)
    } else {
      var newScore = new HighScore(data)
      try {
        await newScore.save()
        res.sendStatus(200)
      } catch (error) {
        next(error)
      }
    }  
  } catch (err) {
    console.log(err)
  }
})

app.get("/getScores",  async (req, res) => {
    res.send(await scores.getScores())
})


app.listen(port, console.log(`app listening on ${port}`))