import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Form from 'antd/es/form';
import Button from 'antd/es/button';
import Input from 'antd/es/input';
import Descriptions from 'antd/es/descriptions';
import 'antd/es/descriptions/style/css';
import 'antd/es/form/style/css';
import 'antd/es/input/style/css';
import 'antd/es/button/style/css';
import * as ProfileComp from '../../components/Profile';
import './style.scss';

const CommonProfileComp = ProfileComp.default;

class Profile extends React.PureComponent {
  componentDidMount() {
    // console.log('packageId', this.props.match.params.packageId);
  }

  handleLogout = () => {
    const { history, deAuthorizeUser } = this.props;
    deAuthorizeUser();
    history.push('/auth');
  }

  render() {
    const { profile: { profile }, history, form: { getFieldDecorator } } = this.props;
    const {
      EmailID, MobileNo, CAddress, CPinCode, CCity, Gender
    } = profile;
    return (
      <div className="profile-page">
        <Helmet>
          <title>Profile</title>
          <meta
            name="description"
            content="Profile"
          />
        </Helmet>
        <div className="profile-details">
          <CommonProfileComp data={profile} history={history} handleEvent={{ logout: this.handleLogout }} isProfile />
          <div className="user-profile">
            <Descriptions title="User Info">
              <Descriptions.Item label="Email ID">{EmailID}</Descriptions.Item>
              <Descriptions.Item label="Mobile No">{MobileNo}</Descriptions.Item>
              <Descriptions.Item label="Address">{CAddress},  {CCity} - {CPinCode}</Descriptions.Item>
              <Descriptions.Item label="Gender">{Gender === 1 ? 'Male' : 'FeMale'}</Descriptions.Item>
            </Descriptions>
          </div>
          <div className="edit-section">
            <div className="desc">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ],
                  })(
                    <Input placeholder="Email Address" />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your name',
                      },
                    ],
                  })(<Input placeholder="Please input your name" />)}
                </Form.Item>
              </Form>
            </div>
            <div className="action-buttons">
              <Button block type="primary" className="checkout-btn">
                  Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const WrappedProfile = Form.create({ name: 'Profile' })(Profile);

Profile.propTypes = {
  form: PropTypes.any,
  history: PropTypes.any,
  deAuthorizeUser: PropTypes.func,
  profile: PropTypes.any
};


export default WrappedProfile;
