import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationForVote, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdotes from '../services/anecdotes'

const Anecdotes = (props) => {

    const vote = (id) => {
        props.voteAnecdote(id)
        const anecdote = props.anecdotes.find(anecdote => anecdote.id === id)
        const votedAnecdote = {
            content: anecdote.content,
            votes: anecdote.votes + 1,
            id: anecdote.id
        }
        anecdotes.update(votedAnecdote)
        props.notificationForVote(anecdote.content)
        setTimeout(() => {
            props.removeNotification()
        }, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>)
            )}
        </div>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    if (filter === 'ALL') {
        return anecdotes
    } else {
        const show = anecdotes.filter(a => JSON.stringify(a).includes(filter))
        return show
    }
}

const mapStateToProps = (state) => {
    return {
        anecdotes: anecdotesToShow(state),
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    notificationForVote,
    removeNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
export default ConnectedAnecdotes