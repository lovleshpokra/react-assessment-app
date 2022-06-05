import {
  START_EXAM, SET_EXAMSTART, GET_QUESTIONS, SET_INSTRUCTIONS, SET_QUESTIONS, RECORD_ANSWER, SUBMIT_EXAM
} from './constants';

const initialState = {
  studentId: '',
  examId: '',
  studentExamId: '',
  instructions: {},
  examQuestions: {},
  examRecord: {},
  status: 0,
  lastAttemptTime: 0
};

function packageReducer(state = initialState, action) {
  switch (action.type) {
    case START_EXAM:
      return { ...state, studentId: action.studentId, examId: action.examId };
    case SET_EXAMSTART:
      return { ...state, studentExamId: action.studentExamId };
    case SET_INSTRUCTIONS:
      return { ...state, instructions: action.instructions };
    case GET_QUESTIONS:
      return { ...state, studentId: action.studentId, examId: action.examId };
    case SET_QUESTIONS:
      return { ...state, examQuestions: action.examQuestions };
    case RECORD_ANSWER:
      return { ...state, examRecord: action.examRecord };
    case SUBMIT_EXAM:
      return { ...state, status: action.status, lastAttemptTime: action.lastAttemptTime };

    default:
      return state;
  }
}

export default packageReducer;
