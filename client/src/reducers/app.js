import {getCognitoToken} from '../lib/cognitoServices';

const initState = {
  open: false,
  cognitoToken: false,
}

const LOAD_COGNITO_TOKEN = 'LOAD_COGNITO_TOKEN'
const SET_SHOPIFY_PARAMS = 'SET_SHOPIFY_PARAMS'

export const setShopifyParams = (params) => ({type: SET_SHOPIFY_PARAMS, payload: params})
export const loadCognitoToken = (token) => ({type: LOAD_COGNITO_TOKEN, payload: token})
export const fetchCognitoToken = (payload) => {
  return (dispatch) => {
    getCognitoToken(payload)
      .then(token => dispatch(loadCognitoToken(token)))
  }
}


export default (state = initState, action) => {

  switch (action.type) {
    case SET_SHOPIFY_PARAMS:
      return {...state, shopifyParams: action.payload}
    case LOAD_COGNITO_TOKEN:
      return {...state, cognitoToken: action.payload}
    default:
      return state;
  }
}