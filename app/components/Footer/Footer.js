import React from 'react';
import Tabs from 'antd/es/tabs';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style/css';
import 'antd/es/tabs/style/css';
import './style.scss';

export default class Footer extends React.PureComponent {
  handleTabClick = (e) => {
    if (e === '1') {
      window.location.hash = '/appdashboard';
    }
    if (e === '2') {
      window.location.hash = '/examlist';
    }
    if (e === '3') {
      window.location.hash = '/profile';
    }
    if (e === '4') {
      window.location.hash = '/menu';
    }
  }

  render() {
    const { TabPane } = Tabs;
    return (
      <footer className="tabs">
        <Tabs tabPosition="bottom" onTabClick={this.handleTabClick} size="small">

          <TabPane
            tab={(
              <span>
                <Icon type="line-chart" />
          Dashboard
              </span>
            )}
            key="1"
          >
          </TabPane>
          <TabPane
            tab={(
              <span>
                <Icon type="book" />
          Exam
              </span>
            )}
            key="2"
          >
          </TabPane>
          <TabPane
            tab={(
              <span>
                <Icon type="user" />
          Profile
              </span>
            )}
            key="3"
          >
          </TabPane>
          <TabPane
            tab={(
              <span>
                <Icon type="bars" />
         Menu
              </span>
            )}
            key="4"
          >
          </TabPane>
        </Tabs>
      </footer>
    );
  }
}
