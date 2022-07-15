import "./Board.css"
import { useState, useEffect } from "react"

export default function Key (props) { 

    const [keyClassName, setKeyClassName] = useState("key")

    const handleOnClick = () => {
        if(keyClassName === ("guessedKey") || props.gameOver){
          return
        }
        if(props.word.includes(props.char) && !props.correctGuesses.includes(props.char)){
            const guesses = [props.char, ...props.correctGuesses]
            props.setCorrectGuesses(guesses)
        } else {
          if(props.wrongGuesses <= 8){
            props.setWrongGuesses(prev => prev + 1)
          }
        }
        setKeyClassName("guessedKey")
    }

	useEffect (() => {
		setKeyClassName("key")
	}, [props.clearKeys, props.gameOver])

    return (
        <div key={props.char} className={keyClassName} onClick={handleOnClick}>{props.char}</div>
    )
}