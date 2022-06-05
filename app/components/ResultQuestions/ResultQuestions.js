/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HTMLrenderer from '../HTMLrenderer';
import './style.scss';

export default class QuestionWindow extends PureComponent {
  render() {
    const {
      questionsList
    } = this.props;
    return (
      <div className="result-question-window">
        {
          questionsList.map((currentQuestion) => (
            <div key={currentQuestion.QuesNo} className="question-item">
              <div className="info-panel">
                <div className="question-no">
              Question No.: {currentQuestion.QuesNo}
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
                        <input type="radio" id={option.QuesOptionID} checked={option.IsRight} name={option.QuestionID} value={option.QuesOptionID} />
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
              </div>

            </div>
          ))
        }
      </div>
    );
  }
}
QuestionWindow.propTypes = {
  questionsList: PropTypes.array
};
