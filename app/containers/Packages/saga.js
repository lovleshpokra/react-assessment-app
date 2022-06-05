import {
  call, put, takeLatest, select
} from 'redux-saga/effects';
import request from 'utils/request';
import { startLoading, stopLoading } from 'utils/actions';
import { GET_PACKAGES } from './constants';
import { packagesLoaded, packagesLoadingError } from './actions';
import config from '../../app-config';
import {
  getAuthDataFromRedux
} from '../Auth/selectors';

export function* getPackages() {
  yield put(startLoading());

  const authData = yield select(getAuthDataFromRedux());
  const requestURL = `${config.baseUrl}packages/0`;

  try {
    const response = yield call(request, requestURL);
    yield put(packagesLoaded(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(packagesLoadingError(err));
    yield put(stopLoading());
  }
}


export default function* update() {
  yield takeLatest(GET_PACKAGES, getPackages);
}
