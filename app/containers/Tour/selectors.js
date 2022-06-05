import { createSelector } from 'reselect';

const selectBanners = (state) => state.tour;

const makeSelectBanners = () => createSelector(
  selectBanners,
  (tourState) => tourState.banners
);

export {
  makeSelectBanners,
};
