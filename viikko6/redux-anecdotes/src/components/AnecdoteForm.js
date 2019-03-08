import React, { useState } from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationForAdd, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdotes from '../services/anecdotes'

const NewAnecdote = (props) => {
    const [anecdote, setAnecdote] = useState('')
    const add = async (event) => {
      event.preventDefault()
      console.log('event', event)
      const newAnecdote = await anecdotes.createNew(anecdote)
      props.addAnecdote(newAnecdote.content)
      props.notificationForAdd(newAnecdote.content)
      setTimeout(() => {
        props.removeNotification()
      }, 5000)

      setAnecdote('')

    }
    
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={add}>
            <input name="anecdote" value={anecdote} onChange={event => setAnecdote(event.target.value)} />
            <button type="submit">create</button>
        </form>
      </div>
    )
  
}
  
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  addAnecdote,
  notificationForAdd,
  removeNotification
}

export default connect(mapStateToProps, mapDispatchToProps )(NewAnecdote)