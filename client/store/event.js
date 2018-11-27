import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_EVENT = 'GET_EVENT'

/**
 * INITIAL STATE
 */
const initialState = {
  allEvents: [],
  singleEvent: {}
}

/**
 * ACTION CREATORS
 */
const getEvent = event => ({type: GET_EVENT, event})

/**
 * THUNK CREATORS
 */
export const fetchEvent = (eventId) => async dispatch => {
  let res
  try {
    res = await axios.get(`/api/events/${eventId}`)
    const event = res.data
    const action = getEvent(event)
    console.log('event in thunk', event)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENT:
    return { ...state, singleEvent: action.event}
    default:
      return state
  }
}
