import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { authorizeUser, getSetupData, register } from './actions';
import {
  getAuthDataFromRedux, getAuthErrorFromRedux, selectSetupData
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Auth from './Auth';

const mapDispatchToProps = (dispatch) => ({
  authorizeUserFromServer: (credentials) => dispatch(authorizeUser(credentials)),
  getSetupData: () => dispatch(getSetupData()),
  register: (registerUser) => dispatch(register(registerUser)),
});

const mapStateToProps = createStructuredSelector({
  authData: getAuthDataFromRedux(),
  authError: getAuthErrorFromRedux(),
  setupData: selectSetupData()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(withReducer, withSaga, withConnect)(Auth);
export { mapDispatchToProps };
