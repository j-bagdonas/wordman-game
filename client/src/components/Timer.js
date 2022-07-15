
import { useState, useEffect } from "react"
import '../App.css'

export default function Timer ({ gameOver, setGameOver, resetTimer, setResetTimer, wrongGuesses}) {
    
    const [timeRemaining, setTimeRemaining] = useState(60)

    useEffect(() => {
        if(timeRemaining > 0 && !gameOver){
            var timer = setTimeout(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1)
            }, 1000);
            
        } else {
            setGameOver(true)
            setTimeRemaining(60)
        }
      
        if(wrongGuesses >= 9) {
          setGameOver(true)
          setTimeRemaining(60)
        }
        
        if(resetTimer){
            setTimeRemaining(60)
            setResetTimer(false)
        }

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeRemaining, gameOver, resetTimer, setGameOver, setResetTimer]) 

    return (
        <h4 className="timer">Time: {timeRemaining}</h4>
    )
}