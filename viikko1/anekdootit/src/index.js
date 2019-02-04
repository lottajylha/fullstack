import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
 const [selected, setSelected] = useState(0)
 const [votes, setVotes] = useState(new Array(5).fill(0))
 const [popular, setPopular] = useState(0)

 const setValue = (value) => {
   return () => {
       setSelected(value)
       setArray()
   }
 }

 const setArray = () => {
   return () => {
     const copy = {...votes}
     copy[selected] += 1
     setVotes(copy)
     setMostPopular()
     setVotesForPopular(copy[popular])
   }
 }

 const setMostPopular = () => {
    for (let i = 0; i < 5; i++) {
      if (votes[i] > votes[popular]) {
       setPopular(i)
       setVotesForPopular(votes)
      }
    }
 }

 console.log('selected: ' + selected)
 console.log(votes)
 console.log('most votes indeksilla : ' + popular)
 console.log('votes maara: ' + votes[popular])

 return (
   <div>
     <h1>Anecdote of the day</h1>
     <Anecdote votes={votes} anecdotes={props.anecdotes} value={selected}/>
     <Button handleClick={setValue(Math.floor(Math.random() * 5))} text='Get random anecdote!'/>
     <Button handleClick={setArray()} text='Vote'/>

     <h1>Anecdote with most votes</h1>
     <Anecdote votes={votes} anecdotes={props.anecdotes} value={popular}/>
   </div>
 )
 }

const Button = (props) =>
   <button onClick={props.handleClick}>{props.text} </button>

const anecdotes = [
 'If it hurts, do it more often',
 'Adding manpower to a late software project makes it later!',
 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
 'Premature optimization is the root of all evil.',
 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Anecdote = (props) => {
 return (
   <div>
     <p>{props.anecdotes[props.value]}</p>
     <p>has {props.votes[props.value]} votes </p>
   </div>
 )
}

ReactDOM.render(
 <App anecdotes={anecdotes} />,
 document.getElementById('root')
)