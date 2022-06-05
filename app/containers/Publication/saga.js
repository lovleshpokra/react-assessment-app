import {
  call, put, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { startLoading, stopLoading } from 'utils/actions';
import { GET_PUBLICATION } from './constants';
import { publicationLoaded, publicationLoadingError } from './actions';
import config from '../../app-config';

export function* getPublication() {
  yield put(startLoading());

  const requestURL = `${config.webBaseUrl}books`;

  try {
    const response = yield call(request, requestURL);
    yield put(publicationLoaded(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(publicationLoadingError(err));
    yield put(stopLoading());
  }
}


export default function* update() {
  yield takeLatest(GET_PUBLICATION, getPublication);
}
