import { GET_EXAMS, SET_EXAMS } from './constants';

// The initial state of the App
const initialState = {
  examList: [],
};

function examReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXAMS:
      return { ...state, examList: [] };
    case SET_EXAMS:
      return { ...state, examList: action.examList };
    default:
      return state;
  }
}

export default examReducer;
