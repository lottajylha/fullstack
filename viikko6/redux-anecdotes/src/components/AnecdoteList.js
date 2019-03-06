import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationForVote } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Anecdotes = ({store}) => {
    
    const anecdotesToShow = () => {
        console.log('filter: ', store.getState().filter)
        console.log('filter.action: ', store.getState().filter.action)
        if ( store.getState().filter === 'ALL' ) {
            return store.getState().anecdotes
        } else {
            const show = store.getState().anecdotes.filter(a => a.content.includes(store.getState().filter))
            return show
        }
    }
  
    const vote = (id) => {
        store.dispatch(voteAnecdote(id))
        let voted = store.getState().anecdotes.filter(anecdote => anecdote.id === id)
        voted = voted.map(a => a.content)
        console.log('content: ', voted)
        store.dispatch(notificationForVote(voted))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotesToShow().map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotes