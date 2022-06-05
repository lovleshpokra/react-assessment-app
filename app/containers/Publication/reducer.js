import { GET_PUBLICATION, SET_PUBLICATION } from './constants';

// The initial state of the App
const initialState = {
  publication: [],
};

function publicationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PUBLICATION:
      return { ...state, publication: [] };
    case SET_PUBLICATION:
      return { ...state, publication: action.publication };
    default:
      return state;
  }
}

export default publicationReducer;
