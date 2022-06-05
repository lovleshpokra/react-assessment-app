import React, {Fragment} from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import './style.scss';

export default class ExamList extends React.PureComponent {
  handleProceedClick = (courseId) => () => {
    const { history } = this.props;
    history.push(`/demo-exam/${courseId}`);
  }

  render() {
    const { setupData: {Course} } = this.props;
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
          Course
        </div>
        <div className="description">
          Select a course for Demo Exam
        </div>
        <div className="listing-page">
          {Course && Course.length ? (
            <ul>
              {
                Course.map((c) => <li role="presentation" key={c.CourseID} onClick={this.handleProceedClick(c.CourseID)}>{c.CourseName}</li>)
              }
            </ul>
          ) : (
            <Fragment        />
          )}
        </div>
      </div>
    );
  }
}
ExamList.propTypes = {
  setupData: PropTypes.object
};
