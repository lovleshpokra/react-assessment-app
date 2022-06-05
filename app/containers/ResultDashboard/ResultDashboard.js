import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Row from 'antd/es/row';
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Icon from 'antd/es/icon';
import Statistic from 'antd/es/statistic';
import Drawer from 'antd/es/drawer';
import Progress from 'antd/es/progress';
import 'antd/es/progress/style/css';
import 'antd/es/drawer/style/css';
import 'antd/es/button/style/css';
import 'antd/es/icon/style/css';
import 'antd/es/statistic/style/css';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import ResultQuestions from '../../components/ResultQuestions';
import './style.scss';

const pN = (number) => parseInt(number, 10);
export default class ResultDashboard extends React.PureComponent {
  state = { visible: false };

  componentDidMount() {
    const { getResult, match } = this.props;
    getResult(match.params.studentExamId);
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { resultData: { ExamDetails, Questions } } = this.props;
    const { visible } = this.state;
    let accuracyPercentage = 0;
    let marksPercentage = 0;
    let attemptPercentage = 0;
    let successPercentage = 0;
    if (ExamDetails) {
      accuracyPercentage = ((pN(ExamDetails.RightQues) / pN(ExamDetails.AtemptQues)) * 100).toFixed(2);
      marksPercentage = ((pN(ExamDetails.ObtainMarks) / pN(ExamDetails.TotalMarks)) * 100).toFixed(2);
      attemptPercentage = ((pN(ExamDetails.AtemptQues) / pN(ExamDetails.TotalQuestion)) * 100).toFixed(2);
      successPercentage = ((pN(ExamDetails.RightQues) / pN(ExamDetails.TotalQuestion)) * 100).toFixed(2);
    }
    const centerGraphWidth = `${window.innerWidth - 100}px`;
    return (
      <div className="result-dashboard">
        <Helmet>
          <title>Result Dashboard</title>
          <meta
            name="description"
            content="Result Dashboard"
          />
        </Helmet>
        {ExamDetails && (
          <div className="dashboard-items">
            <div className="exam-name">{ExamDetails.ExamName}</div>
            <div className="dashboard-statics top">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Progress type="circle" percent={marksPercentage} status="active" width={centerGraphWidth} format={(percent) => `${percent}% Marks`} strokeWidth={12} strokeColor="#ff9800" />
                  <div className="item">
                    <span>{ExamDetails.StudentRank} Rank <br /> out of {ExamDetails.StudentCount} Students</span>
                  </div>
                </Col>
              </Row>


            </div>
            <div className="right-panel">
              <Row gutter={16}>
                <Col span={12}>
                  <Icon type="control" />
                  <Statistic title="Questions" value={ExamDetails.RightQues} suffix={`/ ${ExamDetails.TotalQuestion}`} />
                </Col>
                <Col span={12}>
                  <Icon type="trophy" />
                  <Statistic title="Marks" value={ExamDetails.ObtainMarks} suffix={`/ ${ExamDetails.TotalMarks}`} />
                </Col>
              </Row>
              <div className="que-panel">
                <Button type="primary" shape="circle" onClick={this.showDrawer} icon="arrow-right" />
              </div>
            </div>


          </div>

        )
        }
        {ExamDetails
&& (
  <div className="dashboard-statics">
    <Row gutter={[16, 16]}>
      <Col span={12}>

        <Progress type="circle" percent={accuracyPercentage} strokeWidth={12} />
        <div className="desc"> Question Accuracy</div>
      </Col>
      <Col span={12}>
        <Progress type="circle" percent={attemptPercentage} successPercent={successPercentage} status="active" strokeWidth={12} />
        <div className="desc"> Right vs Attempted Questions </div>
      </Col>
    </Row>


  </div>
)}
        <Drawer
          title="Question wise Analysis"
          placement="right"
          closable
          onClose={this.onClose}
          visible={visible}
          width="95%"
          destroyOnClose
        >
          {Questions && <ResultQuestions questionsList={Questions} />}
        </Drawer>
      </div>
    );
  }
}
ResultDashboard.propTypes = {
  match: PropTypes.object,
  getResult: PropTypes.func,
  resultData: PropTypes.object
};
