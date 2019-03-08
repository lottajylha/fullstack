import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const combineReducer = combineReducers({
    anecdotes: reducer,
    notification : notificationReducer,
    filter : filterReducer
  })

const store = createStore(combineReducer, applyMiddleware(thunk))

export default store