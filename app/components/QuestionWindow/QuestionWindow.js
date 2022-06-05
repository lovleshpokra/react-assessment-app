/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/es/button';
import Icon from 'antd/es/icon';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import 'antd/es/row/style/css';
import 'antd/es/icon/style/css';
import 'antd/es/col/style/css';
import 'antd/es/button/style/css';
import HTMLrenderer from '../HTMLrenderer';
import './style.scss';

export default class QuestionWindow extends PureComponent {
  render() {
    const {
      questionsList, currentQuestion, changeQue, status, handleQueAnswer, reviewLater, clearAnswer, timeToDisplay
    } = this.props;
    return (
      <div className="exam-question-window">
        <div className="question-list">
          <ul>
            {
              questionsList.map((que) => (
                <li key={que.QuestionID} role="presentation" onClick={changeQue(que.QuesNo)} className={status[que.status]}>
                  {que.QuesNo}
                </li>
              ))
            }
          </ul>
        </div>
        <div className="info-panel">
          <div className="question-no">
              Question No.: {currentQuestion.QuesNo}
          </div>

          <div className="timer">
           Time Left: {timeToDisplay}
          </div>
        </div>
        <div className="current-question">
          <div className="question">
            <div className="question-english">
              <HTMLrenderer content={currentQuestion.QuestionEng} />
            </div>
            <div className="question-hindi hindi">
              <HTMLrenderer content={currentQuestion.QuestionHindi} />
            </div>
          </div>
          <div className="options">
            {
              currentQuestion.Options.map((option) => (
                <div key={option.QuesOptionID}>
                  <input type="radio" id={option.QuesOptionID} checked={option.QuesOptionID === currentQuestion.answer} name={option.QuestionID} value={option.QuesOptionID} onChange={handleQueAnswer(option.QuesOptionID, currentQuestion.QuestionID, currentQuestion.QuesNo)} />
                  <label htmlFor={option.QuesOptionID}>
                    <div className="option">
                      <span>
                        <HTMLrenderer content={option.Options} />
                      </span>
                      <span className="hindi">
                        <HTMLrenderer content={option.OptionHindi} />
                      </span>
                    </div>
                  </label>
                </div>
              ))
            }
          </div>
          <div className="action-button">

            <Row gutter={[16, 16]}>
              <Col span={13}>
                <Button type="primary" block onClick={reviewLater(currentQuestion.QuesNo)}>
                  <Icon type="check" />

              Mark for Review
                </Button>
              </Col>
              <Col span={11}>
                <Button block type="danger" onClick={clearAnswer(currentQuestion.QuesNo, currentQuestion.QuestionID)}>Clear Answer</Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
QuestionWindow.propTypes = {
  questionsList: PropTypes.array,
  currentQuestion: PropTypes.object,
  changeQue: PropTypes.func,
  status: PropTypes.object,
  handleQueAnswer: PropTypes.func,
  reviewLater: PropTypes.func,
  clearAnswer: PropTypes.func,
  timeToDisplay: PropTypes.string
};
