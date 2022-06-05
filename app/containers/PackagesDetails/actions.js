import {
  GET_PACKAGEDETAILS, SET_PACKAGEDETAILS, ADD_DISCOUNT, APPLY_PROMOCODE, REMOVE_PROMOCODE, CHECKOUT, MAKE_PURCHASE
} from './constants';

export function getPackageDetails(planId) {
  return {
    type: GET_PACKAGEDETAILS,
    planId
  };
}
export function packageDetailsLoaded(packageDetail) {
  return {
    type: SET_PACKAGEDETAILS,
    packageDetail
  };
}
export function packageDetailsLoadingError(error) {
  return {
    type: SET_PACKAGEDETAILS,
    error,
    packageDetail: {}
  };
}

export function applyPromoCode(promoDetails) {
  return {
    type: APPLY_PROMOCODE,
    promoDetails
  };
}
export function addDiscount(discount) {
  return {
    type: ADD_DISCOUNT,
    discount
  };
}
export function discountError(error) {
  return {
    type: ADD_DISCOUNT,
    error,
    discount: {}
  };
}
export function removePromoCode() {
  return {
    type: REMOVE_PROMOCODE
  };
}
