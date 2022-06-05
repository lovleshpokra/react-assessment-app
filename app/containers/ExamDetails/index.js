import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getExamDetails } from './actions';
import { makeSelectExams } from '../ExamList/selectors';
import {
  makeSelectExamDetails
} from './selectors';

import {
  getAuthDataFromRedux
} from '../Auth/selectors';
import reducer from './reducer';
import saga from './saga';
import ExamDetails from './ExamDetails';

const mapDispatchToProps = (dispatch) => ({
  getSelectedExam: (id, isDemo = false) => dispatch(getExamDetails(id, isDemo))
});

const mapStateToProps = createStructuredSelector({
  examsList: makeSelectExamDetails(),
  authData: getAuthDataFromRedux(),
  planList: makeSelectExams()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'examDetail', reducer });
const withSaga = injectSaga({ key: 'examDetail', saga });

export default compose(withReducer, withSaga, withConnect)(ExamDetails);
export { mapDispatchToProps };
