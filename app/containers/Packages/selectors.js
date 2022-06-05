import { createSelector } from 'reselect';

const selectPackages = (state) => state.packages;

const makeSelectPackages = () => createSelector(
  selectPackages,
  (packageState) => packageState.packages
);

export {
  makeSelectPackages,
};
