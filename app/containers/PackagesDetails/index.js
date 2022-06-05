import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getPackageDetails, applyPromoCode, removePromoCode } from './actions';
import { makeSelectPackageDetails, makeSelectDiscount } from './selectors';
import reducer from './reducer';
import saga from './saga';
import PackagesDetails from './PackagesDetails';

const mapDispatchToProps = (dispatch) => ({
  getPlanDetails: (id) => dispatch(getPackageDetails(id)),
  applyPromoCode: (promoDetails) => dispatch(applyPromoCode(promoDetails)),
  removePromoCode: () => dispatch(removePromoCode())
});

const mapStateToProps = createStructuredSelector({
  packageDetail: makeSelectPackageDetails(),
  discount: makeSelectDiscount()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'packageDetail', reducer });
const withSaga = injectSaga({ key: 'packageDetail', saga });

export default compose(withReducer, withSaga, withConnect)(PackagesDetails);
export { mapDispatchToProps };
