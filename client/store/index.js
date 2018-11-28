import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
//import contract from './contract'
import event from './event'
import {contractReducer} from './contract'


const reducer = combineReducers({  contracts: contractReducer,
  user,
 // contract,
   event})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './contract'
export * from './event'

