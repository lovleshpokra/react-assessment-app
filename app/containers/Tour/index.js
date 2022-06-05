import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getBanners } from './actions';
import {
  makeSelectBanners
} from './selectors';

import {
  getAuthDataFromRedux
} from '../Auth/selectors';
import reducer from './reducer';
import saga from './saga';
import Tour from './Tour';

const mapDispatchToProps = (dispatch) => ({
  loadBannersData: () => dispatch(getBanners())
});

const mapStateToProps = createStructuredSelector({
  banners: makeSelectBanners(),
  authData: getAuthDataFromRedux()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'tour', reducer });
const withSaga = injectSaga({ key: 'tour', saga });

export default compose(withReducer, withSaga, withConnect)(Tour);
export { mapDispatchToProps };
