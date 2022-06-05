import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import PropTypes from 'prop-types';


class LoadingIndicator extends PureComponent {
  render() {
    const { loading } = this.props;
    return (
      <div className={`loading-indicator ${loading ? 'show' : 'hide'}`}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}

LoadingIndicator.propTypes = {
  loading: PropTypes.any
};
export default connect((state) => ({
  loading: state.global.loading
}))(LoadingIndicator);
