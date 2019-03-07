import React from 'react'
import ReactDOM from 'react-dom'
import  { createStore, combineReducers } from 'redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import {initialize} from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { Provider } from 'react-redux'
import anecdotes from './services/anecdotes'

const combineReducer = combineReducers({
  anecdotes: reducer,
  notification : notificationReducer,
  filter : filterReducer
})

const store = createStore(combineReducer)

anecdotes.getAll().then(anecdotes =>
  store.dispatch(initialize(anecdotes))
)

store.subscribe(() => console.log(store.getState()))

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)