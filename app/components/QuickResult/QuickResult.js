import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Result from 'antd/es/result';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/result/style/css';
import './style.scss';

export default class QuickResult extends PureComponent {
  render() {
    const { savedAnswers, totalTimeTaken, data: { ExamName, TotalQuestion } } = this.props;
    return (
      <div className="instructions">
        <div className="exam-info">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="item">
                <div>Attempted</div>
                <div>{savedAnswers.size} Question(s)</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="item">
                <div>Missed</div>
                <div>{TotalQuestion - savedAnswers.size} Question(s)</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="item">
                <div>Per Question Time</div>
                <div>{(totalTimeTaken / savedAnswers.size).toFixed(2)} Minute(s)</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="item">
                <div>Time Spent</div>
                <div>{totalTimeTaken} Minute(s)</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="result-html">
          <Result
            status="success"
            title="Exam submitted successfully!"
            subTitle={`Detailed exam statics for Exam: ${ExamName} is available on result dashboard! Please navigate through buttons below.`}
          />
        </div>
      </div>
    );
  }
}
QuickResult.propTypes = {
  data: PropTypes.any,
  savedAnswers: PropTypes.any,
  totalTimeTaken: PropTypes.any
};
