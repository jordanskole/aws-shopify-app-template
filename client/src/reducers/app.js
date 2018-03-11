import {getCognitoToken} from '../lib/cognitoServices';

const initState = {
  cognito: {
    Token: false,
    IdentityId: false
  },
  shopifyParams: {
  	shop: null,
  	locale: null,
  	protocol: null,
  	timestamp: null,
  	hmac: null
  }
}

const LOAD_COGNITO_TOKEN = 'LOAD_COGNITO_TOKEN'
const SET_SHOPIFY_PARAMS = 'SET_SHOPIFY_PARAMS'

export const setShopifyParams = (params) => ({type: SET_SHOPIFY_PARAMS, payload: params})
export const loadCognitoToken = (cognito) => ({type: LOAD_COGNITO_TOKEN, payload: cognito})
export const fetchCognitoToken = (payload) => {
  return (dispatch) => {
    getCognitoToken(payload)
      .then(res => dispatch(loadCognitoToken(res.cognito)))
  }
}


export default (state = initState, action) => {
  switch (action.type) {
    case SET_SHOPIFY_PARAMS:
      return {...state, shopifyParams: action.payload}
    case LOAD_COGNITO_TOKEN:
      return {...state, cognito: action.payload}
    default:
      return state;
  }
}