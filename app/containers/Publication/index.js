import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getPublication } from './actions';
import {
  makeSelectPublication
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Publication from './Publication';

const mapDispatchToProps = (dispatch) => ({
  getPublication: () => dispatch(getPublication())
});

const mapStateToProps = createStructuredSelector({
  publication: makeSelectPublication()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'publication', reducer });
const withSaga = injectSaga({ key: 'publication', saga });

export default compose(withReducer, withSaga, withConnect)(Publication);
export { mapDispatchToProps };
