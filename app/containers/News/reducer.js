import { GET_NEWS, SET_NEWS } from './constants';

// The initial state of the App
const initialState = {
  news: [],
};

function newsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NEWS:
      return { ...state, news: [] };
    case SET_NEWS:
      return { ...state, news: action.news };
    default:
      return state;
  }
}

export default newsReducer;
