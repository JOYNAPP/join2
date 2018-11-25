import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CONTRACTS = 'GET_CONTRACT'
const ADD_CONTRACT = 'ADD_CONTRACT'
const RESPOND_CONTRACT = 'RESPOND_CONTRACT'


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
export const getAllContracts = () => ({type: GET_ALL_CONTRACTS})
export const addContract = (contract) => ({type: ADD_CONTRACT, contract})
export const respondToContract = (response) => ({type: RESPOND_CONTRACT, response})
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
//This could be for updating responses to a contract
export const putContract = (response) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/userContract/`, response)
      console.log('response in thunk', res)
      const contract = res.data
      console.log('contract', contract)
      const action = respondToContract(contract)
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
    case RESPOND_CONTRACT:
      return {...state, singleContract: action.contract}
    default:
      return state
  }
}
