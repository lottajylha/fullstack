import React from 'react'
import ReactDOM from 'react-dom'
import  { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const combineReducer = combineReducers({
  anecdotes: reducer,
  notification : notificationReducer,
  filter : filterReducer
})

const store = createStore(combineReducer)

store.subscribe(() => console.log(store.getState()))

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)