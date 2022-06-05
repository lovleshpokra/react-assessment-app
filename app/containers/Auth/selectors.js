import { createSelector } from 'reselect';
import { SET_AUTHDATA } from './constants';

const authState = (state) => state.auth;

const isAlreadyAuthorized = () => window.localStorage.getItem(SET_AUTHDATA);

const getAuthDataFromRedux = () => createSelector(
  authState,
  (aState) => {
    if (isAlreadyAuthorized()) {
      const parsedAuthData = JSON.parse(isAlreadyAuthorized());
      return parsedAuthData;
    }
    if (aState) {
      return aState.authData;
    }
    return {};
  }
);

const selectSetupData = () => createSelector(
  authState,
  (aState) => aState.setupData
);

const getAuthErrorFromRedux = () => createSelector(
  authState,
  (aState) => aState.error
);

export {
  getAuthDataFromRedux,
  getAuthErrorFromRedux,
  selectSetupData
};
