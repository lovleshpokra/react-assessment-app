import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Button from 'antd/es/button';
import Result from 'antd/es/result';
import 'antd/es/button/style/css';
import 'antd/es/result/style/css';
import './style.scss';

export default class ExamList extends React.PureComponent {
  componentDidMount() {
    const { getPurchasedPackages } = this.props;
    getPurchasedPackages();
  }

  handleProceedClick = (planId) => () => {
    const { history } = this.props;
    history.push(`/examdetails/${planId}`);
  }

  handleBuyNowLink = () => {
    const { history } = this.props;
    history.push('/packages');
  }

  render() {
    const { examList } = this.props;
    return (
      <div className="exam-listing-page ui-bg-gradient">
        <Helmet>
          <title>Exam</title>
          <meta
            name="description"
            content="Exam"
          />
        </Helmet>
        <div className="title">
          Purchased Plans
        </div>
        <div className="description">
          Select a plan to attempt available exam
        </div>
        <div className="listing-page">
          {examList && examList.length ? (
            <ul>
              {
                examList.map((exam) => <li role="presentation" key={exam.PlanID} onClick={this.handleProceedClick(exam.PlanID)}>{exam.PlanName}</li>)
              }
            </ul>
          ) : (
            <Result
              status="500"
              title="Oops!"
              subTitle="You haven't purchased any package yet!"
              extra={<Button type="primary" onClick={this.handleBuyNowLink}>Buy Now</Button>}
            />
          )}
        </div>
      </div>
    );
  }
}
ExamList.propTypes = {
  history: PropTypes.any,
  examList: PropTypes.array,
  getPurchasedPackages: PropTypes.func
};
