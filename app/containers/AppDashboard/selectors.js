import { createSelector } from 'reselect';

const selectAppDashboard = (state) => state.appDashboard;

const makeSelectTestimonials = () => createSelector(
  selectAppDashboard,
  (appState) => appState.testimonials
);

const makeSelectProfile = () => createSelector(
  selectAppDashboard,
  (appState) => appState.profile
);

const makeSelectDashboard = () => createSelector(
  selectAppDashboard,
  (appState) => appState.dashboard
);

const selectSetupData = () => createSelector(
  selectAppDashboard,
  (appState) => appState.setupData
);

export {
  makeSelectTestimonials,
  makeSelectProfile,
  makeSelectDashboard,
  selectSetupData
};
