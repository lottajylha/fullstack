import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationForVote, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Anecdotes = (props) => {
    
    
  
    const vote = (id) => {
        props.voteAnecdote(id)
        let voted = props.anecdotes.filter(anecdote => anecdote.id === id)
        voted = voted.map(a => a.content)
        console.log('content: ', voted)
        props.notificationForVote(voted)
        setTimeout(() => {
            props.removeNotification()
        }, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotes.map(anecdote =>
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

const anecdotesToShow = ({anecdotes, filter}) => {
    /*console.log('filter: ', store.getState().filter)
    console.log('filter.action: ', store.getState().filter.action)*/
    if ( filter === 'ALL' ) {
        return anecdotes
    } else {
        const show = anecdotes.filter(a => a.content.includes(filter))
        return show
    }
}

const mapStateToProps = (state) => {
    return {
      anecdotes : anecdotesToShow(state),
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    notificationForVote,
    removeNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
export default ConnectedAnecdotes