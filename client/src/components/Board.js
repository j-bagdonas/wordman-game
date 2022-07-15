import './Board.css';
import { useEffect, useState } from "react"
import Key from "./Key.js"

const row1 = "qwertyuiop";
const row2 = 'asdfghjkl';
const row3 = 'zxcvbnm';

export default function Board ({ word, fetchWord, score, setScore, gameOver, setResetTimer, wrongGuesses, setWrongGuesses}){

	const [correctGuesses, setCorrectGuesses] = useState([])
	
	const [letterList, setletterList] = useState ([])
	const [clearKeys, setClearKeys] = useState(false)
	const [scoreDisplay, setScoreDisplay] = useState("none")
	const [previousWord, setPreviousWord] = useState("")

	const addScore = (word) => {
		setPreviousWord(word)
		setScoreDisplay("block")
		setScore(score + (Math.abs(word.length - 5) * 100 + 500))
		setResetTimer(true)
		setTimeout(() => {	
			setScoreDisplay("none")
			setCorrectGuesses([])
			setWrongGuesses(0)
			setletterList([])  
			fetchWord()
		}, 1900)
	}
	
	useEffect(()=> {
		let tempList = [];
		[...word].forEach((char, key) => {
			tempList.push(
				<div key={key} className = "letterDiv">
					{<p className="letter">{correctGuesses.includes(char) && char}</p>}
					<p className="underline"></p>
				</div>
			)
		})
		setletterList(tempList)   
		const charSet = new Set(word).size
		if (charSet === correctGuesses.length && charSet > 0) {
			addScore(word)
			setClearKeys(true)
			
		} else {
			setClearKeys(false)
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [correctGuesses, word])

	useEffect(()=>{
		setCorrectGuesses([])
		setWrongGuesses(0)
		setletterList([]) 
	}, [gameOver, setWrongGuesses])
  
	var keyRow1 = [];
	var keyRow2 = [];
	var keyRow3 = [];

	const makeKeyBoardRow = (row, keyRow) => {
		[...row].forEach((char) => {
			keyRow.push(
				<Key
					word={word}
					correctGuesses={correctGuesses} 
					setCorrectGuesses={setCorrectGuesses}
          wrongGuesses={wrongGuesses}
					setWrongGuesses={setWrongGuesses}
					clearKeys={clearKeys}
					gameOver={gameOver}
					key={char} 
					char={char}
				/>
			)
		})
	}

	makeKeyBoardRow(row1, keyRow1)
	makeKeyBoardRow(row2, keyRow2)
	makeKeyBoardRow(row3, keyRow3)
		
	return(
		<>
		<div className = "board">
			<div className = "word">
				{letterList}
			</div>
		</div>
		 <div className = "keyboard" >
			<div className = "keyRow">
				{keyRow1}
			</div>
			<div className = "keyRow">
				{keyRow2}
			</div>
			<div className = "keyRow">
				{keyRow3}
			</div>
		</div>
		<div className="scoreAlert" style={{display: scoreDisplay}}> 
			<h3>{previousWord} + {(Math.abs(previousWord.length - 5) * 100 + 500)}</h3>
		</div>
		</>
	)
}
