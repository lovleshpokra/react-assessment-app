import { createSelector } from 'reselect';

const selectPackageDetails = (state) => state.packageDetail;

const makeSelectPackageDetails = () => createSelector(
  selectPackageDetails,
  (packageState) => packageState.packageDetail
);

const makeSelectPlanId = () => createSelector(
  selectPackageDetails,
  (packageState) => packageState.planId
);
const makeSelectPromoCode = () => createSelector(
  selectPackageDetails,
  (packageState) => packageState.promoDetails
);

const makeSelectDiscount = () => createSelector(
  selectPackageDetails,
  (packageState) => packageState.discount
);


export {
  makeSelectPackageDetails,
  makeSelectPlanId,
  makeSelectPromoCode,
  makeSelectDiscount
};
