import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CONTRACTS = 'GET_CONTRACT'
const ADD_CONTRACT = 'ADD_CONTRACT'
const RESPOND_CONTRACT = 'RESPOND_CONTRACT'
const GET_USER_CONTRACTS ='GET_USER_CONTRACTS'


/**
 * INITIAL STATE
 */
const initialState = {
  allContracts: [],
  singleContract: {},
  userContracts: [],
  userConfirmContracts: []
}

/**
 * ACTION CREATORS
 */
export const getAllContracts = () => ({type: GET_ALL_CONTRACTS})
export const addContract = (contract) => ({type: ADD_CONTRACT, contract})
export const respondToContract = (response) => ({type: RESPOND_CONTRACT, response})
export const getUserContracts = (contracts, confirmContracts) => ({type: GET_USER_CONTRACTS, contracts, confirmContracts})
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
      const res = await axios.post(`/api/logic/`, response)
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

export const loadContracts = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/userContract/${userId}/users`)
      const contracts = res.data.contracts
      const confirmContracts = contracts.filter(contract => contract.userContract.response)
      const action = getUserContracts(contracts, confirmContracts)
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
    case GET_USER_CONTRACTS:
      return {...state, userContracts: action.contracts, userConfirmContracts: action.confirmContracts}
    default:
      return state
  }
}
