import { createSelector } from 'reselect';

const selectExamWindow = (state) => state.examWindow;

const selectExamData = () => createSelector(
  selectExamWindow,
  (examState) => examState
);

export {
  selectExamData
};
