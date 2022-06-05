import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getPackages } from './actions';
import {
  makeSelectPackages
} from './selectors';

import {
  getAuthDataFromRedux
} from '../Auth/selectors';
import reducer from './reducer';
import saga from './saga';
import Packages from './Packages';

const mapDispatchToProps = (dispatch) => ({
  getPackages: () => dispatch(getPackages())
});

const mapStateToProps = createStructuredSelector({
  packages: makeSelectPackages(),
  authData: getAuthDataFromRedux()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'packages', reducer });
const withSaga = injectSaga({ key: 'packages', saga });

export default compose(withReducer, withSaga, withConnect)(Packages);
export { mapDispatchToProps };
