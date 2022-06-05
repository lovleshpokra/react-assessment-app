import {
  GET_RESULT, SET_RESULT
} from './constants';

const initialState = {
  resultData: {},
  studentExamId: ''
};

function appDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RESULT:
      return { ...state, studentExamId: action.studentExamId, resultData: {} };
    case SET_RESULT:
      return { ...state, resultData: action.resultData };
    default:
      return state;
  }
}

export default appDashboardReducer;
