import { createSelector } from 'reselect';

const selectPublication = (state) => state.publication;

const makeSelectPublication = () => createSelector(
  selectPublication,
  (publicationState) => publicationState.publication
);

export {
  makeSelectPublication,
};
