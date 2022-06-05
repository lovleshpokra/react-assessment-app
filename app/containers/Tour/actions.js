import { GET_BANNERS, SET_BANNERS } from './constants';

export function getBanners() {
  return {
    type: GET_BANNERS
  };
}
export function bannersLoaded(banners) {
  return {
    type: SET_BANNERS,
    banners
  };
}
export function bannersLoadingError(error) {
  return {
    type: SET_BANNERS,
    error,
    banners: []
  };
}
