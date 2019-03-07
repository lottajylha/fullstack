import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationForAdd, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const NewAnecdote = (props) => {

    const add = (event) => {
        event.preventDefault()
        props.addAnecdote(event.target.anecdote.value)
        props.notificationForAdd(event.target.anecdote.value)
        setTimeout(() => {
          props.removeNotification()
        }, 5000)
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

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(NewAnecdote)
export default ConnectedForm