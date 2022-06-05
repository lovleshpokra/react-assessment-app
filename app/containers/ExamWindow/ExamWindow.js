import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Button from 'antd/es/button';
import Icon from 'antd/es/icon';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import 'antd/es/row/style/css';
import 'antd/es/icon/style/css';
import 'antd/es/col/style/css';
import 'antd/es/button/style/css';
import Instructions from '../../components/Instructions';
import QuickResult from '../../components/QuickResult';
import QuestionWindow from '../../components/QuestionWindow';
import './style.scss';

const status = {
  VISITED: 'VISITED',
  FRESH: 'FRESH',
  MARKED: 'MARKED',
  ANSWERED: 'ANSWERED'
};
let timerInterval = null;
let pollingInterval = null;
export default class ExamWindow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: null,
      showQuestionPane: false,
      isFirstQueAttempt: false,
      questions: [],
      isFirstQue: true,
      isLastQue: false,
      showResult: false,
      timeToDisplay: '00:00',
      savedAnswers: new Map(),
      totalTimeTaken: 0
    };
    this.getQuestionWithOptions = this.getQuestionWithOptions.bind(this);
    this.startExamNow = this.startExamNow.bind(this);
    this.endExam = this.endExam.bind(this);
    this.goToResultsPage = this.goToResultsPage.bind(this);
    this.changeQue = this.changeQue.bind(this);
    this.prevQue = this.prevQue.bind(this);
    this.nextQue = this.nextQue.bind(this);
    this.updateExamStatus = this.updateExamStatus.bind(this);
    this.goToInstructions = this.goToInstructions.bind(this);
    this.handleQueAnswer = this.handleQueAnswer.bind(this);
    this.reviewLater = this.reviewLater.bind(this);
    this.clearAnswer = this.clearAnswer.bind(this);
    this.getTimerInPlace = this.getTimerInPlace.bind(this);
  }

  componentDidMount() {
    const { startExam, match } = this.props;
    startExam(match.params.studentId, match.params.examId);
  }

  componentWillReceiveProps(nextProps) {
    const questionsList = nextProps.exam.examQuestions;
    const { isFirstQueAttempt } = this.state;
    if (isFirstQueAttempt && questionsList) {
      if (questionsList && questionsList.SubjectQuestions && questionsList.SubjectQuestions.length) {
        const questionArry = [];
        questionsList.SubjectQuestions.map((subject) => questionArry.push(...subject.Questions));
        const updatedQuestionsList = questionArry.map((question) => {
          question.status = status.FRESH;
          question.answer = null;
          return question;
        });
        const sortedQueList = updatedQuestionsList.sort((a, b) => a.QuesNo - b.QuesNo);
        this.setState({ questions: sortedQueList }, () => {
          const currentQuestion = this.getQuestionWithOptions(1);
          this.setState({
            currentQuestion, isFirstQueAttempt: false, isFirstQue: true, isLastQue: false
          });
        });
      }
    }
  }

  getQuestionWithOptions = (queNo) => {
    const { questions } = this.state;
    let requestedQue = questions.find((que) => que.QuesNo === queNo);
    if (!requestedQue) {
      const { currentQuestion } = this.state;
      if (currentQuestion) {
        const nextQueNo = currentQuestion.QuesNo + 1;
        requestedQue = questions.find((que) => que.QuesNo === nextQueNo);
      } else {
        requestedQue = questions.find((que) => que.QuesNo === 1);
      }
      if (!requestedQue) {
        const [requested] = questions;
        if (requested) {
          requestedQue = requested;
        }
      }
    }
    return requestedQue;
  }

  goToInstructions = () => {
    this.setState({ showQuestionPane: false });
  }

  // eslint-disable-next-line no-unused-vars
  updateExamStatus = (e = {}, stts = 1) => {
    const { submitExam, exam: { instructions: { ExamDuration } } } = this.props;
    const { timeToDisplay } = this.state;
    const lastAttemptTime = (parseInt(ExamDuration, 10) - parseInt(timeToDisplay.split(':')[0], 10));
    if (stts === 1) {
      this.setState({ showResult: true, totalTimeTaken: lastAttemptTime });
      clearInterval(timerInterval);
      clearInterval(pollingInterval);
      return submitExam(stts, lastAttemptTime);
    }
    return submitExam(stts, lastAttemptTime);
  }

  changeQue = (queNo) => () => {
    const currentQuestion = this.getQuestionWithOptions(queNo);
    const { questions } = this.state;
    const isFirstQue = questions[0].QuesNo === currentQuestion.QuesNo;
    const isLastQue = questions[questions.length - 1].QuesNo === currentQuestion.QuesNo;
    this.updateQuestionStatus(currentQuestion.QuesNo, status.VISITED, null);
    this.setState({ currentQuestion, isFirstQue, isLastQue });
  }

  prevQue = () => {
    const { currentQuestion } = this.state;
    const quesNo = currentQuestion.QuesNo;
    const prevQue = quesNo - 1;
    this.changeQue(prevQue)();
  }

  getTimerInPlace = () => {
    const startTimer = (duration) => {
      let start = Date.now();
      let diff;
      let minutes;
      let seconds;
      const timer = () => {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        // eslint-disable-next-line no-bitwise
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        // eslint-disable-next-line no-bitwise
        minutes = (diff / 60) | 0;
        // eslint-disable-next-line no-bitwise
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        this.setState({ timeToDisplay: `${minutes}:${seconds}` });

        if (diff <= 0) {
          // add one second so that the count down starts at the full duration
          // example 05:00 not 04:59
          start = Date.now() + 1000;
        }
      };
      // we don't want to wait a full second before the timer starts
      timer();
      timerInterval = setInterval(timer, 1000);
      pollingInterval = setInterval(() => this.updateExamStatus({}, 0), 59000);
    };
    const { exam: { instructions: { ExamDuration, LastAttempTime } } } = this.props;
    const currentExamDuration = 60 * ExamDuration;
    const lastExamDuration = 60 * LastAttempTime;
    startTimer(currentExamDuration - lastExamDuration);
  }


  updateQuestionStatus = (queNo, stts, answer, isForceChange = false) => {
    const { questions } = this.state;
    const updatedQueList = questions.map((que) => {
      if (que.QuesNo === queNo) {
        if (isForceChange) {
          que.status = stts;
          que.answer = answer;
          return que;
        }
        let shouldSkipStatusChange = false;
        if (stts === status.MARKED || que.status === status.MARKED) {
          que.status = status.MARKED;
          shouldSkipStatusChange = true;
        }
        if (!shouldSkipStatusChange) {
          if (que.status === status.ANSWERED && stts !== status.ANSWERED) {
            que.status = status.ANSWERED;
          } else {
            que.status = stts;
          }
        }
        if (answer) {
          que.answer = answer;
        }
        return que;
      }
      return que;
    });
    this.setState({ questions: updatedQueList });
  }

  nextQue = () => {
    const { currentQuestion } = this.state;
    const quesNo = currentQuestion.QuesNo;
    const nextQue = quesNo + 1;
    this.changeQue(nextQue)();
  }

  startExamNow = () => {
    const { loadQuestions, match } = this.props;
    const { questions } = this.state;
    if (!questions.length) {
      this.getTimerInPlace();
      loadQuestions(match.params.studentId, match.params.examId);
    }
    this.setState({ showQuestionPane: true, isFirstQueAttempt: !questions.length });
  }

  endExam = () => {
    const { history, match } = this.props;
    if (match.params.packageId && match.params.packageId === 'undefined')
    {
      return history.push(`/courses`);  
    }
    return history.push(`/examdetails/${match.params.packageId}`);
  }

  goToResultsPage = () => {
    const { history, exam: { studentExamId: { StudentExamID } } } = this.props;
    history.push(`/results/${StudentExamID}`);
  }

  handleQueAnswer = (answer, queId, queNo) => () => {
    const { saveAnswer } = this.props;
    const { savedAnswers } = this.state;
    this.updateQuestionStatus(queNo, status.ANSWERED, answer);
    saveAnswer({
      questionId: queId,
      quesOptionId: answer
    });
    savedAnswers.set(queNo, answer);
    this.setState({ savedAnswers });
  }

  reviewLater = (queNo) => () => {
    this.updateQuestionStatus(queNo, status.MARKED);
  }

  clearAnswer = (queNo, queId) => () => {
    const { saveAnswer } = this.props;
    const { savedAnswers } = this.state;
    this.updateQuestionStatus(queNo, status.VISITED, null, true);
    saveAnswer({
      questionId: queId,
      quesOptionId: null
    });
    savedAnswers.delete(queNo);
    this.setState({ savedAnswers });
  }

  render() {
    const {
      exam: { instructions }
    } = this.props;
    const {
      savedAnswers, totalTimeTaken, currentQuestion, showQuestionPane, questions, isFirstQue, isLastQue, timeToDisplay, showResult
    } = this.state;
    return (
      <div className="exam-window">
        <Helmet>
          <title>Exam</title>
          <meta
            name="description"
            content="Attempt Exam"
          />
        </Helmet>
        <div className="exam-components">
          <div className="exam-head">
            <span className="flex-middle">{instructions.ExamName}</span>
          </div>
          {!showResult && !showQuestionPane && instructions.ExamID && <Instructions data={instructions} />}
          {!showResult && showQuestionPane && currentQuestion && <QuestionWindow timeToDisplay={timeToDisplay} questionsList={questions} currentQuestion={currentQuestion} changeQue={this.changeQue} status={status} handleQueAnswer={this.handleQueAnswer} reviewLater={this.reviewLater} clearAnswer={this.clearAnswer} />}
          {!showResult ? (
            <div className="exam-footer">
              {
                // eslint-disable-next-line no-nested-ternary
                showQuestionPane ? (currentQuestion ? (
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      {isFirstQue
                        ? (
                          <Button block onClick={this.goToInstructions} className="prev-btn" type="dashed">
                Instructions
                          </Button>
                        ) : (
                          <Button block onClick={this.prevQue} className="prev-btn">
                            <Icon type="left" />   Previous
                          </Button>
                        )}
                    </Col>
                    <Col span={12}>
                      {isLastQue
                        ? (
                          <Button block onClick={this.updateExamStatus} className="next-btn" type="primary">
                Submit
                          </Button>
                        ) : (
                          <Button block onClick={this.nextQue} className="next-btn" type="primary">
                Next <Icon type="right" />
                          </Button>
                        )}
                    </Col>
                  </Row>
                ) : (<Fragment />)) : (instructions.ExamID
                  ? (
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Button block onClick={this.endExam} type="danger">
                Close
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button block onClick={this.startExamNow} type="primary">
                Start Exam
                        </Button>
                      </Col>
                    </Row>
                  ) : (<Fragment />)
                )
              }
            </div>
          ) : <Fragment />}
          {showResult && <QuickResult data={instructions} savedAnswers={savedAnswers} totalTimeTaken={totalTimeTaken} />}
          {showResult ? (
            <div className="exam-footer">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Button block onClick={this.endExam}>
                Close
                  </Button>
                </Col>
                <Col span={12}>
                  <Button block onClick={this.goToResultsPage} type="primary">
                Result
                  </Button>
                </Col>
              </Row>
            </div>
          ) : <Fragment />}
        </div>
      </div>
    );
  }
}
ExamWindow.propTypes = {
  match: PropTypes.object,
  history: PropTypes.any,
  startExam: PropTypes.func,
  loadQuestions: PropTypes.func,
  exam: PropTypes.object,
  saveAnswer: PropTypes.func,
  submitExam: PropTypes.func
};
