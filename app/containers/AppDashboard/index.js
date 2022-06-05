import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getTestimonials, getProfile, getDashboard } from './actions';
import { getSetupData } from '../Auth/actions';
import {
  makeSelectTestimonials, makeSelectProfile, makeSelectDashboard
} from './selectors';
import {
  getAuthDataFromRedux
} from '../Auth/selectors';
import reducer from './reducer';
import saga from './saga';
import AppDashboard from './AppDashboard';

const mapDispatchToProps = (dispatch) => ({
  loadTestimonials: () => dispatch(getTestimonials()),
  getProfile: () => dispatch(getProfile()),
  getDashboard: () => dispatch(getDashboard()),
  getSetupData: () => dispatch(getSetupData())
});

const mapStateToProps = createStructuredSelector({
  testimonials: makeSelectTestimonials(),
  authData: getAuthDataFromRedux(),
  profile: makeSelectProfile(),
  dashboard: makeSelectDashboard()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appDashboard', reducer });
const withSaga = injectSaga({ key: 'appDashboard', saga });

export default compose(withReducer, withSaga, withConnect)(AppDashboard);
export { mapDispatchToProps };
