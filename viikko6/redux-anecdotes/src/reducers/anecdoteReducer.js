const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAnecdote = (id) => {
  return { type : "VOTE", id : id }
}

export const addAnecdote = content => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content : content,
      id: getId(),
      votes: 0
    }
  }
}

const sortFunction = (a, b) => {
  if (a.votes < b.votes) {
    return 1
  } else if (b.votes < a.votes) {
    return -1
  } else {
    return 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('action.type: ', action.type, ' action.id: ', action.id)
  let newState = state
  switch (action.type) {
    case 'VOTE':
      const id = action.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }
      newState = state
      newState.sort(sortFunction)
      state = newState
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    case 'NEW_ANECDOTE' :
      newState = state
      newState.sort(sortFunction)
      state = newState
      return [...state, action.data]
    default: 
      newState = state
      newState.sort(sortFunction)
      state = newState
      return state
  }
}

export default reducer