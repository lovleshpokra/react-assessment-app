import { GET_EXAMSDETAILS, SET_EXAMSDETAILS } from './constants';

// The initial state of the App
const initialState = {
  examDetails: [],
  planId: '',
  isDemo: ''
};

function examReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXAMSDETAILS:
      return { ...state, examDetails: [], planId: action.planId, isDemo: action.isDemo };
    case SET_EXAMSDETAILS:
      return { ...state, examDetails: action.examDetails };
    default:
      return state;
  }
}

export default examReducer;
