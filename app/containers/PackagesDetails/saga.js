import {
  call, put, takeLatest, select
} from 'redux-saga/effects';
import request from 'utils/request';
import { startLoading, stopLoading } from 'utils/actions';
import { GET_PACKAGEDETAILS, APPLY_PROMOCODE } from './constants';
import {
  packageDetailsLoaded, packageDetailsLoadingError, addDiscount, discountError
} from './actions';
import config from '../../app-config';
import { makeSelectPlanId, makeSelectPromoCode } from './selectors';
import { getAuthDataFromRedux } from '../Auth/selectors';

export function* getPlanDetails() {
  yield put(startLoading());
  const planId = yield select(makeSelectPlanId());
  const requestURL = `${config.baseUrl}PackageDetails`;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        OrgPlanID: planId
      })
    });
    yield put(packageDetailsLoaded(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(packageDetailsLoadingError(err));
    yield put(stopLoading());
  }
}


export function* applyPromoCode() {
  yield put(startLoading());
  const authData = yield select(getAuthDataFromRedux());
  const planId = yield select(makeSelectPlanId());
  const promoDetails = yield select(makeSelectPromoCode());
  const requestURL = `${config.baseUrl}applypromo`;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        StudentId: authData.StudentID,
        PlanID: planId,
        Fees: promoDetails.amount,
        Promocode: promoDetails.code
      })
    });
    yield put(addDiscount(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(discountError(err));
    yield put(stopLoading());
  }
}

export default function* update() {
  yield takeLatest(GET_PACKAGEDETAILS, getPlanDetails);
  yield takeLatest(APPLY_PROMOCODE, applyPromoCode);
}
