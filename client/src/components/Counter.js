import './Counter.css'
export default function Counter (props) {

  var counterComponents = []
  for (let i = 0; i < 9; i++){
    counterComponents.push(
      <CounterComponent key={i} id={i} wrongGuesses={props.wrongGuesses}/>
    )
  }
  return (
    <div className="counterDiv">
      <div className = "counter">
        {counterComponents}
      </div>
    </div>
  )
}

function CounterComponent (props) {
  if(props.wrongGuesses >= props.id + 1){
    return <div className="counterComponentActive"></div>
  } else {
    return <div className="counterComponent"></div>
  }
  
}