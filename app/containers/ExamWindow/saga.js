import {
  call, put, takeLatest, select
} from 'redux-saga/effects';
import request from 'utils/request';
import { startLoading, stopLoading } from 'utils/actions';
import {
  START_EXAM, GET_QUESTIONS, RECORD_ANSWER, SUBMIT_EXAM
} from './constants';
import {
  examStartError, examStarted, setInstructions, setInstructionsError, setQuestions, setQuestionsError
} from './actions';
import config from '../../app-config';
import { selectExamData } from './selectors';

export function* startExam() {
  yield put(startLoading());

  const { studentId, examId } = yield select(selectExamData());
  const requestURL = `${config.baseUrl}StartExam`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        StudentID: studentId,
        ExamID: examId
      })
    });
    yield put(examStarted(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(examStartError(err));
    yield put(stopLoading());
  }
}

export function* getExamInstructions() {
  yield put(startLoading());

  const { studentId, examId } = yield select(selectExamData());
  const requestURL = `${config.baseUrl}ExamDetails`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        StudentID: studentId,
        ExamID: examId
      })
    });
    yield put(setInstructions(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(setInstructionsError(err));
    yield put(stopLoading());
  }
}

export function* getExamQuestions() {
  yield put(startLoading());
  const { studentId, examId } = yield select(selectExamData());
  const requestURL = `${config.baseUrl}ExamQuestions`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        StudentID: studentId,
        ExamID: examId
      })
    });
    yield put(setQuestions(response));
    yield put(stopLoading());
  } catch (err) {
    yield put(setQuestionsError(err));
    yield put(stopLoading());
  }
}

export function* saveAnswer() {
  yield put(startLoading());

  const { studentExamId, examRecord } = yield select(selectExamData());
  const requestURL = `${config.baseUrl}SaveAnswer`;

  try {
    yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        StudentExamID: studentExamId.StudentExamID,
        QuestionID: examRecord.questionId,
        QuesOptionID: examRecord.quesOptionId
      })
    });
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}


export function* submitExam() {
  const {
    status,
    lastAttemptTime, studentExamId, studentId
  } = yield select(selectExamData());
  const requestURL = `${config.baseUrl}SubmitExam`;

  try {
    yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        StudentExamID: studentExamId.StudentExamID,
        StudentID: studentId,
        IsSubmited: status,
        LastAttempTime: lastAttemptTime
      })
    });
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export default function* update() {
  yield takeLatest(START_EXAM, startExam);
  yield takeLatest(START_EXAM, getExamInstructions);
  yield takeLatest(GET_QUESTIONS, getExamQuestions);
  yield takeLatest(RECORD_ANSWER, saveAnswer);
  yield takeLatest(SUBMIT_EXAM, submitExam);
}
