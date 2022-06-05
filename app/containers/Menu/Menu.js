import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';

export default class Menu extends React.PureComponent {
  handleLogout = () => {
    const { history, deAuthorizeUser } = this.props;
    deAuthorizeUser();
    history.push('/auth');
  }

  render() {
    return (
      <div className="menu-page">
        <Helmet>
          <title>Menu</title>
          <meta
            name="description"
            content="Menu"
          />
        </Helmet>
        <div className="listing-page">
          <div className="title">Navigation</div>
          <ul>
            <li>
              <Link to="profile">
                <div className="item">
                  <span>My Account</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="courses">
                <div className="item">
                  <span>Demo Exam</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="examlist">
                <div className="item">
                  <span>Available Exams</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="news">
                <div className="item">
                  <span>Latest News</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="packages">
                <div className="item">
                  <span>Buy Package</span>
                </div>
              </Link>
            </li>

            <li>
              <Link to="publication">
                <div className="item">
                  <span>Publications</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="examlist">
                <div className="item">
                  <span>Daily Quiz</span>
                </div>
              </Link>
            </li>
            <li role="presentation" onClick={this.handleLogout}>
              <div className="item">
                <span>Logout</span>
              </div>

            </li>
          </ul>
        </div>
      </div>
    );
  }
}
Menu.propTypes = {
  history: PropTypes.any,
  deAuthorizeUser: PropTypes.func,
};
