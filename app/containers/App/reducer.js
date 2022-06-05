import { STOP_LOADING, START_LOADING } from 'utils/constants';

// The initial state of the App
export const initialState = {
  loading: false
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case STOP_LOADING: {
      return {
        ...state,
        loading: false
      };
    }
    default:
      return state;
  }
}

export default appReducer;
