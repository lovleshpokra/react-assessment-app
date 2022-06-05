import {
  call, put, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { startLoading, stopLoading } from 'utils/actions';
import { AUTH_USER, GET_SETUP_DATA, REGISTER_USER } from './constants';
import { userAuthorized, userAuthorizationFailed, setSetupData } from './actions';
import config from '../../app-config';

export function* authorizeUser(action) {
  yield put(startLoading());
  const { credentials } = action;
  const requestURL = `${config.baseUrl}login`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        PAddress: '',
        RemoteAddress: '',
        BrowserName: '',
        DeviceType: '',
        EmailID: credentials.email,
        Passwords: credentials.password
      })
    });
    yield put(userAuthorized(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(userAuthorizationFailed(err));
    yield put(stopLoading());
  }
}


export function* registerStudent(action) {
  yield put(startLoading());
  const { registerUser } = action;
  const requestURL = `${config.baseUrl}register`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "PAddress": "",
        "RemoteAddress": "",
        "BrowserName": "",
        "DeviceType": "",
        "EmailID": registerUser.email,
        "Passwords": registerUser.password,
        "CourseID": registerUser.course,
        "SpecializationID": registerUser.branch,
        "MobileNo": registerUser.mobileNumber,
        "StudentName": registerUser.name
      })
    });
    yield put(userAuthorized(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(userAuthorizationFailed(err));
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

export default function* callAuth() {
  yield takeLatest(AUTH_USER, authorizeUser);
  yield takeLatest(REGISTER_USER, registerStudent);
  yield takeLatest(GET_SETUP_DATA, getSetupData);
}
