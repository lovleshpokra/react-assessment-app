import { GET_EXAMS, SET_EXAMS } from './constants';

export function getExams() {
  return {
    type: GET_EXAMS
  };
}
export function examsLoaded(examList) {
  return {
    type: SET_EXAMS,
    examList
  };
}
export function examsLoadingError(error) {
  return {
    type: SET_EXAMS,
    error,
    examList: []
  };
}
