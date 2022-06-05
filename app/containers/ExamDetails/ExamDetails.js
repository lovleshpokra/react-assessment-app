import React, {Fragment} from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Button from 'antd/es/button';
import Icon from 'antd/es/icon';
import Tag from 'antd/es/tag';
import Drawer from 'antd/es/drawer';
import Descriptions from 'antd/es/descriptions';
import 'antd/es/icon/style/css';
import 'antd/es/descriptions/style/css';
import 'antd/es/row/style/css';
import 'antd/es/tag/style/css';
import 'antd/es/col/style/css';
import 'antd/es/drawer/style/css';
import 'antd/es/button/style/css';
import './style.scss';

const masterStatus = {
  COMPLETED: 'completed',
  PARTIAL: 'partial',
  PENDING: 'pending'
};
export default class ExamDetails extends React.PureComponent {
  state = { visible: false, selectedExam: {}, selectedFilter: null, isDemo: false };

  componentDidMount() {
    const { getSelectedExam, match } = this.props;
    if (match.params.packageId)
    {
      getSelectedExam(match.params.packageId);
    }
if (match.params.courseId)
{
  getSelectedExam(match.params.courseId, true);
  this.setState({isDemo: true})
}
  }

  openExamWindow = (examId, packageId) => () => {
    const { history, authData: { StudentID } } = this.props;
    history.push(`/exam/${StudentID}/${packageId}/${examId}`);
  }

  handleFilter = (stts) => () => {
    this.setState({
      selectedFilter: stts
    });
  }

  navigateToResultDashboard = (studentExamID) => () => {
    const { history } = this.props;
    history.push(`/results/${studentExamID}`);
  }

  showDrawer = (exam) => () => {
    this.setState({
      visible: true,
      selectedExam: exam
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      selectedExam: {}
    });
  };

  render() {
    const { examsList, planList, match } = this.props;
    const { visible, selectedExam, selectedFilter, isDemo } = this.state;
    const plan = isDemo ? null : planList.find((p) => String(p.PlanID) === String(match.params.packageId));
    let compltedExam = 0;
    let inComplete = 0;
    let pending = 0;
    let updatedExamList = [];
    if (examsList) {
      updatedExamList = examsList.map((exam) => {
        let status = '';
        if (exam.IsSubmited) {
          compltedExam++;
          status = masterStatus.COMPLETED;
        }
        if (!exam.IsAttempt) {
          pending++;
          status = masterStatus.PENDING;
        }
        if (exam.IsAttempt && exam.IsStart && !exam.IsSubmited) {
          inComplete++;
          status = masterStatus.PARTIAL;
        }
        exam.status = status;
        return exam;
      });
      if (selectedFilter) {
        updatedExamList = updatedExamList.filter((exam) => exam.status === selectedFilter);
      }
    }
    return (
      <div className="exam-listing-page ui-bg-gradient">
        <Helmet>
          <title>Exam Details</title>
          <meta
            name="description"
            content="Exam Details"
          />
        </Helmet>
            <div className="title">
              {plan ? plan.PlanCode : "Demo Exams"}
            </div>
            <div className="description">
              {plan? plan.PlanName : 'Please attempt an exam from below list'}
            </div>
     {plan ?   <div className="exam-statics">
          <div className="summary completed" role="presentation" onClick={this.handleFilter(masterStatus.COMPLETED)}>
            <div className="value">{compltedExam}</div>
            <div className="name">Completed</div>
          </div>
          <div className="summary partial" role="presentation" onClick={this.handleFilter(masterStatus.PARTIAL)}>
            <div className="value">{inComplete}</div>
            <div className="name">Partial</div>
          </div>
          <div className="summary pending" role="presentation" onClick={this.handleFilter(masterStatus.PENDING)}>
            <div className="value">{pending}</div>
            <div className="name">Pending</div>
          </div>
        </div> : <Fragment />}

        <div className="listing-page details  show-status">
          <ul>
            {
              updatedExamList.length ? updatedExamList.map((exam) => (
                <li key={exam.ExamID} role="presentation" className={exam.status} onClick={this.showDrawer(exam)}>
                  {exam.ExamName}
                </li>
              )) : <div className="no-exam">
                No Exams Available <br/> <span>Kindly visit this section as per exam schedule.</span>
              </div>
            }
          </ul>
          <Drawer
            title={selectedExam.ExamCode}
            placement="right"
            closable
            onClose={this.onClose}
            visible={visible}
            width="85%"
            destroyOnClose
          >
            <div className="exam-details-drawer">

              <div className="title">
                {selectedExam.ExamName}
              </div>
              {
                (selectedExam.status === masterStatus.COMPLETED) ? <Tag color="green">Completed</Tag>
                  : (selectedExam.status === masterStatus.PENDING) ? <Tag color="red">Pending</Tag>
                    : (selectedExam.status === masterStatus.PARTIAL) ? <Tag color="gold">Not Submitted</Tag>
                      : <Tag color="#cdcdcd">Not Started</Tag>
              }
              <div className="desc">
                <Descriptions title="Exam Details">
                  <Descriptions.Item label="Max Marks">{selectedExam.TotalMarks}</Descriptions.Item>
                  <Descriptions.Item label="Exam Duration">{selectedExam.ExamDuration} Minutes</Descriptions.Item>
                  <Descriptions.Item label="Question">{selectedExam.TotalQuestion}</Descriptions.Item>
                  <Descriptions.Item label="Negative Marking">{selectedExam.IsNegMarks ? 'Yes' : 'No'}</Descriptions.Item>
                  { selectedExam.IsNegMarks && <Descriptions.Item label="Formula">{selectedExam.NegMarkFormula}</Descriptions.Item>}
                </Descriptions>
              </div>
              <div className="action-buttons">
                {selectedExam.status === masterStatus.PENDING && (
                  <Button block type="primary" onClick={this.openExamWindow(selectedExam.ExamID, match.params.packageId)}>
                    Start
                  </Button>
                )}
                {selectedExam.status === masterStatus.PARTIAL && (
                  <Button block type="primary" onClick={this.openExamWindow(selectedExam.ExamID, match.params.packageId)}>
                          Re-Start
                  </Button>
                )}
                {
                  selectedExam.status === masterStatus.COMPLETED && (
                    <Button block type="primary" onClick={this.navigateToResultDashboard(selectedExam.StudentExamID)}>
                            Result
                    </Button>
                  )
                }
              </div>
            </div>

          </Drawer>
        </div>
      </div>
    );
  }
}
ExamDetails.propTypes = {
  match: PropTypes.object,
  history: PropTypes.any,
  examsList: PropTypes.array,
  getSelectedExam: PropTypes.func,
  planList: PropTypes.array,
  authData: PropTypes.object
};
