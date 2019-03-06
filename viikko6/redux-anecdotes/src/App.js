import React from 'react'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'

const App = (props) => {
  const store = props.store
  
  return (
    <div>
      <Notification store={store}/>
      <Anecdotes store={store}/>
      <NewAnecdote store={store}/>
    </div>
  )
}

export default App
