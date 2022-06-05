import {
  call, put, takeLatest, select
} from 'redux-saga/effects';
import request from 'utils/request';
import { startLoading, stopLoading } from 'utils/actions';
import { GET_EXAMS } from './constants';
import { examsLoaded, examsLoadingError } from './actions';
import config from '../../app-config';
import {
  getAuthDataFromRedux
} from '../Auth/selectors';

export function* getExams() {
  yield put(startLoading());
  const authData = yield select(getAuthDataFromRedux());
  const requestURL = `${config.baseUrl}StudentPackage/${authData.StudentID}`;

  try {
    const response = yield call(request, requestURL);
    yield put(examsLoaded(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(examsLoadingError(err));
    yield put(stopLoading());
  }
}

export default function* update() {
  yield takeLatest(GET_EXAMS, getExams);
}
