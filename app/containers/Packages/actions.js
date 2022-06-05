import { GET_PACKAGES, SET_PACKAGES } from './constants';

export function getPackages() {
  return {
    type: GET_PACKAGES
  };
}
export function packagesLoaded(packages) {
  return {
    type: SET_PACKAGES,
    packages
  };
}
export function packagesLoadingError(error) {
  return {
    type: SET_PACKAGES,
    error,
    packages: []
  };
}
