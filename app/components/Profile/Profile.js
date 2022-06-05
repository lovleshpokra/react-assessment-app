import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'antd/es/avatar';
import Icon from 'antd/es/icon';
import Picture from '../Picture';
import 'antd/es/avatar/style/css';
import 'antd/es/icon/style/css';
import config from '../../app-config';
import './style.scss';

export default class Profile extends PureComponent {
  handleSettings = () => {
    const { handleEvent, isProfile, history } = this.props;
    if (isProfile) {
      handleEvent.editEvent();
    } else {
      history.push('/profile');
    }
  }

  render() {
    const {
      data: {
        StudentName, CourseName, SpecName, ProfilePic
      }, isProfile, handleEvent: { logout }
    } = this.props;
    return (
      <div className="profile-info">
        <div className="top-actions">
          <div className="lft" onClick={this.handleSettings} role="presentation">
            {
              <Icon type={isProfile ? 'edit' : 'setting'} twoToneColor="#FFFFFF" />
            }
          </div>
          <div className="rit" onClick={logout} role="presentation">
            <Icon type="logout" twoToneColor="#FFFFFF" />
          </div>
        </div>
        <div className="picture">
          {
            ProfilePic ? <Picture src={config.profileImgPath + ProfilePic} /> : <Avatar size={80} icon="user" />
          }
        </div>
        <div className="profile-content">
          <div className="name">
            {StudentName}
          </div>
          <div className="desc">
            {SpecName} | {CourseName}
          </div>
        </div>
      </div>
    );
  }
}
Profile.propTypes = {
  history: PropTypes.any,
  data: PropTypes.object,
  isProfile: PropTypes.bool,
  handleEvent: PropTypes.func
};
