import { createSelector } from 'reselect';

const selectNews = (state) => state.news;

const makeSelectNews = () => createSelector(
  selectNews,
  (newsState) => newsState.news
);

export {
  makeSelectNews,
};
