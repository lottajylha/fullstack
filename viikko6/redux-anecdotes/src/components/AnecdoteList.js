import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationForVote } from '../reducers/notificationReducer'

const Anecdotes = ({store}) => {
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
            {store.getState().anecdotes.map(anecdote =>
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
