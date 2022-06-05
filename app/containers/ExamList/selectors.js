import { createSelector } from 'reselect';

const selectExams = (state) => state.exam;

const makeSelectExams = () => createSelector(
  selectExams,
  (examState) => examState ? examState.examList : []
);

export {
  makeSelectExams,
};
