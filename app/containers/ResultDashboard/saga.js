import {
  call, put, takeLatest, select
} from 'redux-saga/effects';
import request from 'utils/request';
import { startLoading, stopLoading } from 'utils/actions';
import { getStudentExamId } from './selectors';
import { GET_RESULT } from './constants';
import {
  resultLoaded, resultLoadingError
} from './actions';
import config from '../../app-config';


export function* getResultData() {
  yield put(startLoading());
  const studentExamId = yield select(getStudentExamId());
  const requestURL = `${config.baseUrl}ExamResult`;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        StudentExamID: studentExamId
      })
    });
    yield put(resultLoaded(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(resultLoadingError(err));
    yield put(stopLoading());
  }
}


export default function* update() {
  yield takeLatest(GET_RESULT, getResultData);
}
