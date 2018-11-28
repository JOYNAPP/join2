import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  allUsers: [],
  singleUser: {}
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const getAllUsers = (allUsers) => ({type: GET_ALL_USERS, allUsers})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () => async dispatch => {
  let res
  try {
    res = await axios.get('/api/users')
    const allUsers = res.data
    const action = getAllUsers(allUsers)
    console.log('allUSers in thunk', allUsers)
    console.log('action', action)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}


export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.singleUser))
  } catch (err) {
    console.error(err)
  }
}


export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const signupNew = (name, email, password, cardHolderName, creditCardNumber, expirationDate, cvc) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/signup`, {name, email, password, cardHolderName, creditCardNumber, expirationDate, cvc})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
    return { ...state, allUsers: action.allUsers}
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return state
    default:
      return state
  }
}
