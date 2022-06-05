import {
  call, put, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { startLoading, stopLoading } from 'utils/actions';
import { GET_NEWS } from './constants';
import { newsLoaded, newsLoadingError } from './actions';
import config from '../../app-config';

export function* getNews() {
  yield put(startLoading());

  const requestURL = `${config.webBaseUrl}homenews`;

  try {
    const response = yield call(request, requestURL);
    yield put(newsLoaded(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(newsLoadingError(err));
    yield put(stopLoading());
  }
}


export default function* update() {
  yield takeLatest(GET_NEWS, getNews);
}
