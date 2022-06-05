import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Form from 'antd/es/form';
import Icon from 'antd/es/icon';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import Button from 'antd/es/button';
import Checkbox from 'antd/es/checkbox';
import Picture from '../../components/Picture';
import logoIcon from '../../images/logo-icon.png';
import 'antd/es/form/style/css';
import 'antd/es/icon/style/css';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/input/style/css';
import 'antd/es/select/style/css';
import 'antd/es/checkbox/style/css';
import 'antd/es/button/style/css';
import './style.scss';

const { Option } = Select;


class Auth extends React.Component {
  state = { isSignIn: true, isPageLoaded: false, signUpData: {} };

  componentDidMount() {const {getSetupData} = this.props;
    this.validateLogin();
    getSetupData();
    setTimeout(() => this.setState({ isPageLoaded: true }), 500);
  }

  componentDidUpdate() {
    this.validateLogin();
  }

  validateLogin = () => {
    const { authData } = this.props;
    if (authData.StudentID) {
      const { history } = this.props;
      history.push('/appdashboard');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, authorizeUserFromServer } = this.props;
    form.validateFields((err, values) => {
      if (!err.email && !err.password) {
        authorizeUserFromServer(values);
      }
    });
  };
  convertBackToSignIn=()=> {
    this.setState({
      isPageLoaded: false
    }, () => setTimeout(() => this.setState({ isPageLoaded: true, isSignIn: true }), 500));
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields(['email', 'password'], (err, values) => {
      if (!err) {
        this.setState({
          signUpData: {
            email: values.email,
            password: values.password
          },
          isPageLoaded: false
        }, () => setTimeout(() => this.setState({ isPageLoaded: true, isSignIn: false }), 500));
      }
    });
  };

  handleSignUpSubmit = (e) => {
    e.preventDefault();
    const { register, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        register(values);
      }
    });
  };

  validateMobileNumber = (rule, value, callback) => {
    const validator = /^[6-9]\d{9}$/;
    if (value && !validator.test(value)) {
      return callback('Please enter valid mobile no.');
    }
    return callback();
  }

  render() {
    const { form, authError, setupData } = this.props;
    const { isPageLoaded, isSignIn, signUpData } = this.state;
    const { getFieldDecorator } = form;
    return (
      <div className="auth-screen">
        <Helmet>
          <title>Sign In</title>
          <meta
            name="description"
            content="Sign In"
          />
        </Helmet>
        <div className="auth-header">
          <Picture src={logoIcon} />
          <h1>
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </h1>
        </div>
        <div className={isSignIn && isPageLoaded ? 'sign-in-form loaded' : 'sign-in-form'}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div>
              <Form.Item>
                <div className={`form-level-error ${authError.Message && ' display'}`}> {authError.Message} </div>
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
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email Address"
                  />,
                )}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please enter your Password!' }],
                })(
                  <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
            </div>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
            Forgot password
              </a>
              <div className="button-container">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Button block type="primary" htmlType="submit" className="login-form-button">
            Log In
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button block type="primary" className="login-form-button light" onClick={this.handleSignUp}>
                Sign Up
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className={!isSignIn && isPageLoaded ? 'sign-up-form loaded' : 'sign-up-form'}>
          <Form onSubmit={this.handleSignUpSubmit} className="login-form">
            <div>
              <div className="user-email" onClick={this.convertBackToSignIn}>
                    {signUpData.email}
              </div>
              <Form.Item>
                <div className={`form-level-error ${authError.Message && ' display'}`}> {authError.Message} </div>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Name',
                    },
                  ],
                })(
                  <Input placeholder="Name" />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('mobileNumber', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Mobile No.',
                    },
                    {
                      validator: this.validateMobileNumber
                    },
                  ],
                })(
                  <Input placeholder="Mobile Number" type="tel" />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('course', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select a course',
                    }
                  ],
                })(
                  <Select>
                    {
                      setupData.Course && setupData.Course.map(opt => <Option value={opt.Value}>{opt.CourseName}</Option>)
                    }
                </Select>,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('branch', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select a Branch',
                    }
                  ],
                })(
                  <Select>
                    {
                      setupData.Specialization && setupData.Specialization.map(opt => <Option value={opt.Value}>{opt.SpecName}</Option>)
                    }
                </Select>,
                )}
              </Form.Item>
            </div>
            <Form.Item>
              <div className="button-container">
                <Button block type="primary" className="login-form-button" onClick={this.handleSignUpSubmit}>
                        Continue
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>

      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'Auth' })(Auth);

Auth.propTypes = {
  form: PropTypes.any,
  history: PropTypes.any,
  authorizeUserFromServer: PropTypes.func,
  authData: PropTypes.object,
  authError: PropTypes.object,
  getSetupData: PropTypes.func,
  setupData:PropTypes.object,
  register:PropTypes.func
};


export default WrappedNormalLoginForm;
