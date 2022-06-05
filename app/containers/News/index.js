import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getNews } from './actions';
import {
  makeSelectNews
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import News from './News';

const mapDispatchToProps = (dispatch) => ({
  getNews: () => dispatch(getNews())
});

const mapStateToProps = createStructuredSelector({
  news: makeSelectNews()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'news', reducer });
const withSaga = injectSaga({ key: 'news', saga });

export default compose(withReducer, withSaga, withConnect)(News);
export { mapDispatchToProps };
