import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CONTRACTS = 'GET_CONTRACT'
const ADD_CONTRACT = 'ADD_CONTRACT'


/**
 * INITIAL STATE
 */
const initialState = {
  allContracts: [],
  singleContract: {}
}

/**
 * ACTION CREATORS
 */
const getAllContracts = () => ({type: GET_ALL_CONTRACTS})
const addContract = (contract) => ({type: ADD_CONTRACT, contract})
/**
 * THUNK CREATORS
 */
export const fetchAllContracts = () => async dispatch => {
  let res
  try {
    res = await axios.get('/api/contracts')
    const allContracts = res.data
    const action = getAllContracts(allContracts)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const postContract = (contract) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/api/contracts', contract)
            const newContract = res.data
            const action = addContract(newContract)
            dispatch(action)
        } catch(err) {
            console.error(err)
        }
    }
}


/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CONTRACTS:
    return { ...state, allContracts: action.contracts}
    default:
      return state
  }
}
