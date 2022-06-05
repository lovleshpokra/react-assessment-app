import {
  GET_RESULT, SET_RESULT
} from './constants';

export function getResult(studentExamId) {
  return {
    type: GET_RESULT,
    studentExamId
  };
}
export function resultLoaded(resultData) {
  return {
    type: SET_RESULT,
    resultData
  };
}
export function resultLoadingError(error) {
  return {
    type: SET_RESULT,
    error,
    resultData: {}
  };
}
