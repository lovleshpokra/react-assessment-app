import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Row from 'antd/es/row';
import Button from 'antd/es/button';
import Carousel from 'antd/es/carousel';
import Col from 'antd/es/col';
import Icon from 'antd/es/icon';
import Picture from '../../components/Picture';
import config from '../../app-config';
import Profile from '../../components/Profile';
import 'antd/es/carousel/style/css';
import 'antd/es/icon/style/css';
import 'antd/es/button/style/css';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import './style.scss';

export default class AppDashboard extends React.PureComponent {
  componentDidMount() {
    const { loadTestimonials, getProfile, getDashboard, getSetupData } = this.props;
    getProfile();
    getDashboard();
    loadTestimonials();
    getSetupData();
  }

  navigateToPackage = () => {
    const { history } = this.props;
    history.push('/packages');
  }

  render() {
    const {
      profile: { profile }, history, testimonials, dashboard: {
        ExamCount, AttemptedExam, NotAttemptExam, Ranking
      }
    } = this.props;
    return (
      <div className="app-dashboard">
        <Helmet>
          <title>App Dashboard</title>
          <meta
            name="description"
            content="App Dashboard"
          />
        </Helmet>
        {profile && <Profile data={profile} history={history} handleEvent={{ }} isProfile={false} />}
        <div className="student-statics">
          <div className="summary">
            <div className="value">{AttemptedExam}</div>
            <div className="name">Exam(s) Taken</div>
          </div>
          <div className="summary">
            <div className="value">{Ranking}</div>
            <div className="name">Your Rank</div>
          </div>
        </div>
        <div className="dashboard-items">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Link to="profile">
                <div className="item">
                  <Icon type="profile" theme="twoTone" twoToneColor="#52c41a" />
                  <div>PROFILE</div>
                </div>
              </Link>
            </Col>
            <Col span={12}>
              <Link to="examlist">
                <div className="item">
                  <Icon type="book" theme="twoTone" twoToneColor="#ff5722" />
                  <div>EXAM</div>
                </div>
              </Link>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Link to="news">
                <div className="item">
                  <Icon type="notification" theme="twoTone" twoToneColor="#2196f3" />
                  <div>News</div>
                </div>
              </Link>
            </Col>
            <Col span={12}>
              <Link to="packages">
                <div className="item">
                  <Icon type="dollar" theme="twoTone" twoToneColor="#795548" />
                  <div>PACKAGES</div>
                </div>
              </Link>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Link to="publication">
                <div className="item">
                  <Icon type="book" theme="twoTone" twoToneColor="#f44336" />
                  <div>Publications</div>
                </div>
              </Link>
            </Col>
            <Col span={12}>
              <Link to="examlist">
                <div className="item">
                  <Icon type="question-circle" theme="twoTone" twoToneColor="#4caf50" />
                  <div>Daily Quiz</div>
                </div>
              </Link>
            </Col>
          </Row>

        </div>

        {(!ExamCount || Number(ExamCount) === 0) ? (
          <div className="student-statics left">
          Looks like you have not purchased any exam!
            <Button onClick={this.navigateToPackage} type="danger">
                Buy Now <Icon type="right" />
            </Button>
          </div>
        ) : <Fragment />}
        <div className="dashboard-testimonial">
          <Carousel autoplay slidesToShow={1} arrows={false}>
            {
              testimonials.map((testimonial) => (
                <div className="t-items" key={testimonial.TestimonialID}>
                  <div className="rank">
                    <span>Rank</span>
                    <span>0{testimonial.Ranks}</span>
                  </div>
                  <div className="photo">
                    <Picture src={config.testimonialImgPath + testimonial.ImagePath} />
                  </div>
                  <h3>{testimonial.Name}</h3>
                  <div className="desc">
                    <p>{testimonial.SpecName}</p>
                    <p>Roll No: {testimonial.RollNo}</p>
                    <p>Exam: {testimonial.ExamName}</p>
                  </div>
                </div>
              ))
            }
          </Carousel>
        </div>
      </div>
    );
  }
}
AppDashboard.propTypes = {
  history: PropTypes.any,
  loadTestimonials: PropTypes.func,
  getProfile: PropTypes.func,
  getDashboard: PropTypes.func,
  getSetupData: PropTypes.func,
  testimonials: PropTypes.array,
  profile: PropTypes.any,
  dashboard: PropTypes.object
};
