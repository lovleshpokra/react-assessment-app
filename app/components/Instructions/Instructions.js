import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import HTMLrenderer from '../HTMLrenderer';
import './style.scss';

export default class ExamInstructions extends PureComponent {
  render() {
    const {
      data: {
        Instructions, TotalMarks, ExamDuration, TotalQuestion, IsNegMarks, NegMarkFormula
      }
    } = this.props;
    return (
      <div className="instructions">
        <div className="exam-info">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="item">
                <div>Total Marks</div>
                <div>{TotalMarks}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="item">
                <div>Exam Duration</div>
                <div>{ExamDuration} Minutes</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="item">
                <div>Total Question</div>
                <div>{TotalQuestion}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="item">
                <div>Negative Marks</div>
                <div>{IsNegMarks ? `Yes, Formula: ${NegMarkFormula}` : 'No'}</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="instruction-html">
          <HTMLrenderer content={Instructions} />
        </div>
      </div>
    );
  }
}
ExamInstructions.propTypes = {
  data: PropTypes.any
};
