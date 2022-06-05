import {
  AUTH_USER, SET_AUTHDATA, LOGOUT_USER, GET_SETUP_DATA, SET_SETUP_DATA, REGISTER_USER
} from './constants';

export function authorizeUser(credentials) {
  return {
    type: AUTH_USER,
    credentials
  };
}
export function userAuthorized(authData) {
  return {
    type: SET_AUTHDATA,
    authData
  };
}
export function userAuthorizationFailed(error) {
  return {
    type: SET_AUTHDATA,
    error,
    authData: {}
  };
}

export function deAuthorizeUser() {
  window.localStorage.removeItem(SET_AUTHDATA);
  return {
    type: LOGOUT_USER
  };
}


export function getSetupData() {
  return {
    type: GET_SETUP_DATA
  };
}


export function setSetupData(setupData) {
  return {
    type: SET_SETUP_DATA,
    setupData
  };
}

export function register(registerUser) {
  return {
    type: REGISTER_USER,
    registerUser
  };
}
