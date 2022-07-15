import "./Leaderboard.css"
import { useState } from "react";


export default function Leaderboard ({displayLeaderboard, setDisplayLeaderboard}) {
    
    const [scores, setScores] = useState()
 
    const fetchScores = async () => {
        const response = await fetch('https://wordman-server.herokuapp.com/getScores')
        const data = await response.json()
        const scoreItems = []
        data.slice(0,10).forEach((score, key) => {
            scoreItems.push(
                <tr key={key}>
                  <th>{score.name}</th>
                  <th>{score.score}</th>
                </tr>                
            )
        });
        setScores(scoreItems)
    }

    const toggleLeaderboard = () => {
        if(displayLeaderboard){
            setDisplayLeaderboard(false)
        } else {
            setDisplayLeaderboard(true)
            fetchScores()
        }
    }

    return (
        <>
       {displayLeaderboard && scores && <div className="leaderboard" > 
       <h2><i>WordMan</i> Top 10</h2>
        <table className="scoreTable">
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {scores}
            </tbody>
        </table>
            <button onClick = {toggleLeaderboard}>exit</button>
        </div> }
        
        <div>
            <button onClick = {toggleLeaderboard}>leaderboard</button>  
        </div>
        </>
    )


}