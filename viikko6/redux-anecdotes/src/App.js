import React from 'react'
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList';

const App = (props) => {
  const anecdotes = props.store.getState()
  const store = props.store
  
  const vote = (id) => {
    store.dispatch(voteAnecdote(id))
  }
  
  return (
    <div>
      <Anecdotes store={store}/>
      <NewAnecdote store={store}/>
    </div>
  )
}

export default App
