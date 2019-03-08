import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdotes from './services/anecdotes'
import { initialize } from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    anecdotes
      .getAll().then(anecdotes => props.initialize(anecdotes))
  },[])

  
  return (
    <div>
      <Notification />
      <Filter />
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default connect(null, { initialize })(App)
