import {
  call, put, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { startLoading, stopLoading } from 'utils/actions';
import { GET_BANNERS } from './constants';
import { bannersLoaded, bannersLoadingError } from './actions';
import config from '../../app-config';

export function* getBanners() {
  yield put(startLoading());

  const requestURL = `${config.baseUrl}appbanner`;

  try {
    const response = yield call(request, requestURL);
    yield put(bannersLoaded(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(bannersLoadingError(err));
    yield put(stopLoading());
  }
}


export default function* update() {
  yield takeLatest(GET_BANNERS, getBanners);
}
