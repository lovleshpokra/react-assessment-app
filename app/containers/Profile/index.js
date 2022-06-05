import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { deAuthorizeUser } from 'containers/Auth/actions';
import { makeSelectProfile } from 'containers/AppDashboard/selectors';
import Profile from './Profile';

const mapDispatchToProps = (dispatch) => ({
  deAuthorizeUser: () => dispatch(deAuthorizeUser())
});

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Profile);
export { mapDispatchToProps };
