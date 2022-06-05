import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectSetupData} from '../AppDashboard/selectors';
import Courses from './Courses';

const mapDispatchToProps = () => ({
  
});

const mapStateToProps = createStructuredSelector({
  setupData: selectSetupData()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(withConnect)(Courses);
export { mapDispatchToProps };
