import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Tag from 'antd/es/tag';
import HTMLrenderer from '../../components/HTMLrenderer';
import 'antd/es/tag/style/css';
import './style.scss';

export default class News extends React.PureComponent {
  componentDidMount() {
    const { getNews } = this.props;
    getNews();
  }

  handleClick = (n) => () => {
    const {URL} = n;
    if (URL=== 'batches') 
    {
      return cordova.InAppBrowser.open("https://zonetech.in/batches", '_system');
    }
      return cordova.InAppBrowser.open(URL, '_system');
  }


  render() {
    const { news } = this.props;
    return (
      <div className="news-page ui-bg-gradient">
        <Helmet>
          <title>News</title>
          <meta
            name="description"
            content="News"
          />
        </Helmet>
        <div className="title">
        Happenings of ZONE TECH
        </div>
        <div className="description">
        Get latest news, batches information, exam information at one place
        </div>
        <div className="listing-page">
          <ul>
            {
              news && news.map((n) => (
                <li key={n.NewsID}>
                  <Tag>
                    {n.NewsDate}
                  </Tag>
                  <div className="news-desc">
                    <div className="title">
                      {n.NewsTitle}
                    </div>
                    <div className="desc">
                      <HTMLrenderer content={n.Descriptions} />
                      <div className="link" onClick={this.handleClick(n)}>View More</div>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
News.propTypes = {
  history: PropTypes.any,
  news: PropTypes.array,
  getNews: PropTypes.func,
};
