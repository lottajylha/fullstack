import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationForAdd } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {

    const add = (event) => {
        event.preventDefault()
        props.store.dispatch(
          addAnecdote(event.target.anecdote.value)
        )
        props.store.dispatch(
          notificationForAdd(event.target.anecdote.value)
        )
        event.target.anecdote.value = ''
    }
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={add}>
            <input name="anecdote" />
            <button type="submit">create</button>
        </form>
      </div>
    )
}
  
export default NewAnecdote