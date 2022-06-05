import React from 'react';
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

export default class ExamList extends React.PureComponent {
  state = { visible: false, selectedPackage: {} };

  componentDidMount() {
    const { getPackages } = this.props;
    getPackages();
  }

  handlePackageClick = (packageId) => () => {
    const { history } = this.props;
    history.push(`/packagedetails/${packageId}`);
  }

  showDrawer = (pkg) => () => {
    this.setState({
      visible: true,
      selectedPackage: pkg
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      selectedPackage: {}
    });
  };

  render() {
    const { packages: { OnlinePackage } } = this.props;
    const { visible, selectedPackage } = this.state;
    return (
      <div className="exam-listing-page ui-bg-gradient">
        <Helmet>
          <title>Buy Exam</title>
          <meta
            name="description"
            content="Buy Exam"
          />
        </Helmet>
        <div className="title">
        Buy Exam Plan
        </div>
        <div className="description">
        For accessing the exam, you need to first purchase it
        </div>
        <div className="listing-page details">
          <ul>
            {
              OnlinePackage && OnlinePackage.map((pack) => (
                <li key={pack.OrgPlanID} role="presentation" onClick={this.showDrawer(pack)}>

                  {pack.OrgPlanName}
                </li>
              ))
            }
          </ul>
        </div>
        <Drawer
          title={selectedPackage.CourseName}
          placement="right"
          closable
          onClose={this.onClose}
          visible={visible}
          width="85%"
          destroyOnClose
        >
          <div className="exam-details-drawer">

            <div className="title">
              {selectedPackage.OrgPlanName}
            </div>
            <div className="desc">
              <Descriptions title="Package Details">
                <Descriptions.Item label="Course">{selectedPackage.CourseName}</Descriptions.Item>
                <Descriptions.Item label="Start Date">{selectedPackage.StartDate}</Descriptions.Item>
                <Descriptions.Item label="End Date">{selectedPackage.EndDate}</Descriptions.Item>
                <Descriptions.Item label="Total Exam">{selectedPackage.ExamLimitText}</Descriptions.Item>
                {selectedPackage.ShowMRP && <Descriptions.Item label="MRP">₹{selectedPackage.PlanMRP}/- Only</Descriptions.Item>}
                <Descriptions.Item label="Fees">₹{selectedPackage.Fees}/- Only</Descriptions.Item>

              </Descriptions>
            </div>
            <div className="action-buttons">
              <Button block type="primary" onClick={this.handlePackageClick(selectedPackage.OrgPlanID)}>
                    Buy Now
              </Button>
            </div>
          </div>

        </Drawer>
      </div>
    );
  }
}
ExamList.propTypes = {
  history: PropTypes.any,
  getPackages: PropTypes.func,
  packages: PropTypes.object
};
