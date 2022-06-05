import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getExams } from './actions';
import {
  makeSelectExams
} from './selectors';

import {
  getAuthDataFromRedux
} from '../Auth/selectors';
import reducer from './reducer';
import saga from './saga';
import ExamList from './ExamList';

const mapDispatchToProps = (dispatch) => ({
  getPurchasedPackages: () => dispatch(getExams())
});

const mapStateToProps = createStructuredSelector({
  examList: makeSelectExams(),
  authData: getAuthDataFromRedux()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'exam', reducer });
const withSaga = injectSaga({ key: 'exam', saga });

export default compose(withReducer, withSaga, withConnect)(ExamList);
export { mapDispatchToProps };
