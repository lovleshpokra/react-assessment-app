import React, { Fragment } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style/css';

const ExportedHeader = withRouter((props) => <Header {...props} />);

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    const date = new Date();
    const day = date.getDay();
    const news = window.localStorage.getItem('news');
    this.state = {
      showBackButton: false,
      newsCount: (news < day || ((news === '30' || news === '31') && day < news)) 
    };
    this.updateComponent = this.updateComponent.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    this.updateComponent(location);
  }

  componentWillReceiveProps(nextProps) {
    this.updateComponent(nextProps.location);
  }

  updateComponent(location) {
    const { pathname } = location;
    if (pathname.split('/')[1] !== 'appdashboard') {
      this.setState({
        showBackButton: true
      });
    } else {
      this.setState({
        showBackButton: false
      });
    }
  }

  backState = () => {
    const { history } = this.props;
    history.goBack();
  }
  clearCount = () => {
    const date = new Date();
    window.localStorage.setItem('news', date.getDay());
    this.setState({newsCount: false});
  }

  render() {
    const { showBackButton, newsCount } = this.state;
    return (
      <div className="app-header-container">
        {showBackButton ? (
          <div className="title" onClick={this.backState}>
            <Icon type="left" />
            {/* {title} */}
          </div>
        ) : <Fragment />}
        <div className="header-actions">
          <span className="icon-manager">
            <Link to="examlist">
              <Icon type="question-circle" />
              <span className="count"></span>
            </Link>
          </span>
          <span className="icon-manager" onClick={this.clearCount}>
            <Link to="news">
              <Icon type="bell" />
              {newsCount ?  <span className="count"></span> : <Fragment/>}
            </Link>
          </span>
        </div>
      </div>
    );
  }
}
Header.propTypes = {
  location: PropTypes.any,
  history: PropTypes.any
};
export default ExportedHeader;
