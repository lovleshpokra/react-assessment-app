import { GET_EXAMSDETAILS, SET_EXAMSDETAILS } from './constants';

export function getExamDetails(planId, isDemo) {
  return {
    type: GET_EXAMSDETAILS,
    planId,
    isDemo
  };
}
export function examDetailsLoaded(examDetails) {
  return {
    type: SET_EXAMSDETAILS,
    examDetails
  };
}
export function examDetailsLoadingError(error) {
  return {
    type: SET_EXAMSDETAILS,
    error,
    examDetails: []
  };
}
