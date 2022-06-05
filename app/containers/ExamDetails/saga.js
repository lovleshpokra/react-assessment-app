import {
  call, put, takeLatest, select
} from 'redux-saga/effects';
import request from 'utils/request';
import { startLoading, stopLoading } from 'utils/actions';
import { GET_EXAMSDETAILS } from './constants';
import { examDetailsLoaded, examDetailsLoadingError } from './actions';
import config from '../../app-config';
import {
  getAuthDataFromRedux
} from '../Auth/selectors';

import {
  makeSelectPlanId, isDemoExam
} from './selectors';

export function* getExamDetails() {
  yield put(startLoading());
  const authData = yield select(getAuthDataFromRedux());
  const planId = yield select(makeSelectPlanId());
  const isDemo = yield select(isDemoExam());
  let requestURL = '';
  let postBody= {
    StudentID: authData.StudentID,
    SpecializationID: authData.SpecializationID,
    ExamName: ''
  };
  if (isDemo)
  {
    requestURL = `${config.baseUrl}PracticeExamByCourse`;
    postBody.CourseID= planId;
  }
  else
  {
    requestURL =  `${config.baseUrl}ExamByPackage`;
    postBody.OrgPlanID= planId;
  }
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    });
    yield put(examDetailsLoaded(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(examDetailsLoadingError(err));
    yield put(stopLoading());
  }
}

export default function* update() {
  yield takeLatest(GET_EXAMSDETAILS, getExamDetails);
}
