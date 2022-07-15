import "./GameOver.css"
import { useState } from "react"


export default function GameOver ({ score, resetGame, gameOver, word}) {

  const [name, setName] = useState("")
  const [initGame, setInitGame] = useState(true)
  const [scoreSaved, setScoreSaved] = useState(false)
  const [saveError, setSaveError] = useState("")

  const postScore = async () => {

    if(name === "") {
      setSaveError("Please enter your name")
      return
    }

    const data = {
      name : name,
      score : score
    }
    try {
      const response = await fetch('https://wordman-server.herokuapp.com/addScore', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
      })
      
      if(response.status === 200){
        setScoreSaved(true)
      } else if(response.status === 406) {
        setSaveError("Username Unacceptable. Pick a different name.")
      } else {
        setSaveError("Server Error.")
      }
    } catch(err) {
      setSaveError(err)
    }

  }
  
  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleStartGame = () => {
    resetGame()
    setInitGame(false)
  }

  const handlePlayAgain = () => {
    resetGame()
    setScoreSaved(false)
    setSaveError("")
    setName("")
  }

  if(initGame){
    return (
      <>
        <div className = "gameInit">
          <h2>Welcome to <i>WordMan</i></h2>
          <p>Guess the correct word to up your score</p>
          <p>You have 60 seconds or 9 letter guesses for each word. Good Luck!</p>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      </>
    )
  } else {
      return (
        <>
        <div className="gameOverAlert" style={{display: gameOver ? "block" : "none"}}> 
            <h3>Game Over!</h3>
            <h3>Score {score}</h3>
            <h4>The word was <i>'{word}'</i></h4>
            {scoreSaved && <p>Score added to leaderboard!</p>}
            {!scoreSaved && saveError && <p>{saveError}</p>}
            {!scoreSaved && <input onChange={handleChange} placeholder = "username" type = "text"></input>}
            {!scoreSaved && <button onClick={postScore}>Add to leaderboard</button>}
            <br></br>
            <button onClick={handlePlayAgain}>Play Again</button>
        </div> 
        </>
      )
  }

} 