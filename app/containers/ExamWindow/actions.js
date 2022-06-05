import {
  START_EXAM, SET_EXAMSTART, SET_INSTRUCTIONS, GET_QUESTIONS, SET_QUESTIONS, RECORD_ANSWER, SUBMIT_EXAM
} from './constants';

export function startExam(studentId, examId) {
  return {
    type: START_EXAM,
    studentId,
    examId
  };
}
export function examStarted(studentExamId) {
  return {
    type: SET_EXAMSTART,
    studentExamId
  };
}
export function examStartError(error) {
  return {
    type: SET_EXAMSTART,
    error,
    studentExamId: ''
  };
}

export function setInstructions(instructions) {
  return {
    type: SET_INSTRUCTIONS,
    instructions
  };
}
export function setInstructionsError(error) {
  return {
    type: SET_INSTRUCTIONS,
    error,
    instructions: {}
  };
}

export function loadQuestions(studentId, examId) {
  return {
    type: GET_QUESTIONS,
    studentId,
    examId
  };
}

export function setQuestions(examQuestions) {
  return {
    type: SET_QUESTIONS,
    examQuestions
  };
}
export function setQuestionsError(error) {
  return {
    type: SET_QUESTIONS,
    error,
    examQuestions: {}
  };
}

export function saveAnswer(examRecord) {
  return {
    type: RECORD_ANSWER,
    examRecord
  };
}
export function submitExam(status, lastAttemptTime) {
  return {
    type: SUBMIT_EXAM,
    status,
    lastAttemptTime
  };
}
