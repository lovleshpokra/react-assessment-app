import {
  AUTH_USER, SET_AUTHDATA, LOGOUT_USER, GET_SETUP_DATA, SET_SETUP_DATA, REGISTER_USER
} from './constants';

// The initial state of the App
const initialState = {
  authData: {},
  error: {},
  setupData: {},
  registerUser: {}
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authData: {}, error: {} };
    case SET_AUTHDATA:
      if (action.error) {
        return { ...state, authData: action.authData, error: action.error };
      }
      window.localStorage.setItem(SET_AUTHDATA, JSON.stringify(action.authData));
      return { ...state, authData: action.authData, error: {} };
    case GET_SETUP_DATA:
      return { ...state, setupData: {} };
    case SET_SETUP_DATA:
      return { ...state, setupData: action.setupData };
    case REGISTER_USER:
      return { ...state, registerUser: action.registerUser, error: {} };
    case LOGOUT_USER:
      return { ...state, authData: {}, error: {} };
    default:
      return state;
  }
}

export default authReducer;
