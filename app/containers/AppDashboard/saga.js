import {
  call, put, takeLatest, select
} from 'redux-saga/effects';
import request from 'utils/request';
import { startLoading, stopLoading } from 'utils/actions';
import { getAuthDataFromRedux } from 'containers/Auth/selectors';
import { GET_SETUP_DATA } from 'containers/Auth/constants';
import { GET_TESTIMONIALS, GET_PROFILE, GET_DASHBOARD } from './constants';
import {
  testimonialsLoaded, setSetupData, testimonialsLoadingError, profileLoaded, profileLoadingError, dashboardLoaded, dashboardLoadingError
} from './actions';
import config from '../../app-config';


export function* getProfile() {
  yield put(startLoading());
  const authDetails = yield select(getAuthDataFromRedux());
  const requestURL = `${config.baseUrl}studentprofile`;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        StudentID: authDetails.StudentID
      })
    });
    yield put(profileLoaded(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(profileLoadingError(err));
    yield put(stopLoading());
  }
}

export function* getSetupData() {
  yield put(startLoading());
  const requestURL = `${config.baseUrl}GetCourseSpec`;
  try {
    const response = yield call(request, requestURL);
    yield put(setSetupData(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getTestimonials() {
  yield put(startLoading());
  const requestURL = `${config.webBaseUrl}homeachivements`;

  try {
    const response = yield call(request, requestURL);
    yield put(testimonialsLoaded(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(testimonialsLoadingError(err));
    yield put(stopLoading());
  }
}

export function* getDashboard() {
  yield put(startLoading());
  const authDetails = yield select(getAuthDataFromRedux());
  const requestURL = `${config.baseUrl}Dashboard/${authDetails.StudentID}`;
  try {
    const response = yield call(request, requestURL);
    yield put(dashboardLoaded(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(dashboardLoadingError(err));
    yield put(stopLoading());
  }
}

export default function* update() {
  yield takeLatest(GET_TESTIMONIALS, getTestimonials);
  yield takeLatest(GET_PROFILE, getProfile);
  yield takeLatest(GET_DASHBOARD, getDashboard);
  yield takeLatest(GET_SETUP_DATA, getSetupData);
}
