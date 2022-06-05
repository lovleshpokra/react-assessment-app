import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getResult } from './actions';
import {
  makeSelectResults
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import ResultDashboard from './ResultDashboard';

const mapDispatchToProps = (dispatch) => ({
  getResult: (studentExamId) => dispatch(getResult(studentExamId))
});

const mapStateToProps = createStructuredSelector({ resultData: makeSelectResults() });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'resultDashboard', reducer });
const withSaga = injectSaga({ key: 'resultDashboard', saga });

export default compose(withReducer, withSaga, withConnect)(ResultDashboard);
export { mapDispatchToProps };
