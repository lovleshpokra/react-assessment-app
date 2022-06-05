import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  startExam, loadQuestions, saveAnswer, submitExam
} from './actions';
import { selectExamData } from './selectors';

import reducer from './reducer';
import saga from './saga';
import ExamWindow from './ExamWindow';

const mapDispatchToProps = (dispatch) => ({
  startExam: (studentId, examId) => dispatch(startExam(studentId, examId)),
  loadQuestions: (studentId, examId) => dispatch(loadQuestions(studentId, examId)),
  saveAnswer: (examRecord) => dispatch(saveAnswer(examRecord)),
  submitExam: (status, lastAttemptTime) => dispatch(submitExam(status, lastAttemptTime))
});

const mapStateToProps = createStructuredSelector({
  exam: selectExamData()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'examWindow', reducer });
const withSaga = injectSaga({ key: 'examWindow', saga });

export default compose(withReducer, withSaga, withConnect)(ExamWindow);
export { mapDispatchToProps };
