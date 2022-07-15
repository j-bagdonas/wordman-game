import { useState } from "react"
import './App.css';
import Board from "./components/Board.js"
import GameOver from "./components/GameOver";
import Timer from "./components/Timer.js"
import Leaderboard from "./components/Leaderboard";
import Counter from "./components/Counter";

function App() {

  const [word, setWord] = useState("")
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [resetTimer, setResetTimer] = useState(false)
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [displayLeaderboard, setDisplayLeaderboard] = useState(false)

  const fetchWord = async () => {
    try {
      const response = await fetch('https://wordman-server.herokuapp.com/')
      const word = await response.json()
      setWord(word)
    } catch (err) {
      console.log(err + " Error fetching word from database.")
    }
  }

  const resetGame = () => {
    setScore(0)
    setGameOver(false)
    fetchWord()
  }

  return (
    <div className="main">
      <div className = "info">
        <h4 className="score">Score: {score}</h4>
        <h1 className="logo"><i>WordMan</i></h1>
        <Timer
          gameOver={gameOver} 
          setGameOver={setGameOver}
          resetGame={resetGame}
          resetTimer={resetTimer}
          setResetTimer={setResetTimer}
          wrongGuesses={wrongGuesses}
        />
      </div>
      <Counter wrongGuesses={wrongGuesses}/>
      <Board 
        word={word}
        score={score}
        setScore={setScore}
		    fetchWord={fetchWord}
        gameOver={gameOver}
        resetTimer={resetTimer}
        setResetTimer={setResetTimer}
        wrongGuesses={wrongGuesses}
        setWrongGuesses={setWrongGuesses}
      />
      <GameOver
        score={score}
        resetGame={resetGame}
        gameOver={gameOver}
        word={word}
      />
      <Leaderboard 
        displayLeaderboard={displayLeaderboard}
        setDisplayLeaderboard={setDisplayLeaderboard}
      /> 
  </div>
  );
}
export default App;
