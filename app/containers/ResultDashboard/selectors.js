import { createSelector } from 'reselect';

const selectResultDashboard = (state) => state.resultDashboard;

const makeSelectResults = () => createSelector(
  selectResultDashboard,
  (resultState) => resultState.resultData
);

const getStudentExamId = () => createSelector(
  selectResultDashboard,
  (resultState) => resultState.studentExamId
);

export {
  makeSelectResults,
  getStudentExamId
};
