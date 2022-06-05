import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Carousel from 'antd/es/carousel';
import PropTypes from 'prop-types';
import Button from 'antd/es/button';
import Picture from '../../components/Picture';
import config from '../../app-config';
import 'antd/es/button/style/css';
import 'antd/es/carousel/style/css';
import './style.scss';

export default class Tour extends React.Component {
  componentDidMount() {
    const { loadBannersData } = this.props;
    this.validateLogin();
    loadBannersData();
  }

  validateLogin = () => {
    const { authData } = this.props;
    if (authData.StudentID) {
      const { history } = this.props;
      history.push('/appdashboard');
    }
  }

  handleProceedClick = () => {
    const { history } = this.props;
    history.push('/auth');
  }

  render() {
    const { banners } = this.props;
    return (
      <div className="tour">
        <Helmet>
          <title>Tour</title>
          <meta
            name="description"
            content="Tour"
          />
        </Helmet>
        {
          banners.length ? (
            <div className="tour-slider">
              <Carousel autoplay slidesToShow={1} arrows>
                {
                  banners.map((item) => (
                    <div key={item.BannerID}>
                      <Picture src={config.bannerPath + item.ImagePath} />
                    </div>
                  ))
                }
              </Carousel>
            </div>
          )
            : <Fragment />
        }
        <div className="tour-desc">
          <Button block onClick={this.handleProceedClick}>
             Proceed
          </Button>
        </div>
      </div>
    );
  }
}
Tour.propTypes = {
  history: PropTypes.any,
  banners: PropTypes.array,
  loadBannersData: PropTypes.func,
  authData: PropTypes.object
};
