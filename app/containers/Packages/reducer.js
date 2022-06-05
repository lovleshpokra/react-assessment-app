import { GET_PACKAGES, SET_PACKAGES } from './constants';

// The initial state of the App
const initialState = {
  packages: {},
};

function packagesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PACKAGES:
      return { ...state, packages: [] };
    case SET_PACKAGES:
      return { ...state, packages: action.packages };
    default:
      return state;
  }
}

export default packagesReducer;
