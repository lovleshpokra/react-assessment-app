import { GET_BANNERS, SET_BANNERS } from './constants';

// The initial state of the App
const initialState = {
  banners: [],
};

function tourReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BANNERS:
      return { ...state, banners: [] };
    case SET_BANNERS:
      return { ...state, banners: action.banners };
    default:
      return state;
  }
}

export default tourReducer;
