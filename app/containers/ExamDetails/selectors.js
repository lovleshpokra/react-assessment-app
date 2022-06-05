import { createSelector } from 'reselect';

const selectExamDetails = (state) => state.examDetail;

const makeSelectExamDetails = () => createSelector(
  selectExamDetails,
  (examState) => examState.examDetails
);

const makeSelectPlanId = () => createSelector(
  selectExamDetails,
  (examState) => examState.planId
);
const isDemoExam = () => createSelector(
  selectExamDetails,
  (examState) => examState.isDemo
);

export {
  makeSelectExamDetails,
  makeSelectPlanId,
  isDemoExam
};
