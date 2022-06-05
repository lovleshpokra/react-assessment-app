import { GET_NEWS, SET_NEWS } from './constants';

export function getNews() {
  return {
    type: GET_NEWS
  };
}
export function newsLoaded(news) {
  return {
    type: SET_NEWS,
    news
  };
}
export function newsLoadingError(error) {
  return {
    type: SET_NEWS,
    error,
    news: []
  };
}
