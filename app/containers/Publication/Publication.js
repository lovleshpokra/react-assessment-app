import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Button from 'antd/es/button';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Drawer from 'antd/es/drawer';
import Descriptions from 'antd/es/descriptions';
import 'antd/es/icon/style/css';
import 'antd/es/descriptions/style/css';
import 'antd/es/row/style/css';
import 'antd/es/tag/style/css';
import 'antd/es/col/style/css';
import 'antd/es/drawer/style/css';
import 'antd/es/button/style/css';
import Picture from '../../components/Picture';
import config from '../../app-config';
import './style.scss';

export default class ExamList extends React.PureComponent {
  state = {
    visible: false, selectedBook: {}, publication: [], categoryName: ''
  };

  componentDidMount() {
    const { getPublication, match } = this.props;
    if (!match.params.catId) {
      getPublication();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.match.params.catId && nextProps.match.params.catId) {
      const catList = this.props.publication[nextProps.match.params.catId];
      return this.setState({ publication: catList.books, categoryName: catList.categoryName });
    }
    if (this.props.match.params.catId && !nextProps.match.params.catId) {
      return this.setState({ publication: this.props.publication, categoryName: '' });
    }
    if (!this.props.publication.length && nextProps.publication.length) {
      return this.setState({ publication: nextProps.publication });
    }
  }

  handleBookBuy = (url) => () => {
    cordova.InAppBrowser.open(url, '_system');
  }

  handleAction = (book, index) => () => {
    const { match, history } = this.props;
    if (match.params.catId) {
      return this.setState({
        visible: true,
        selectedBook: book
      });
    }
    return history.push(`/booklist/${index}`);
  }


  onClose = () => {
    this.setState({
      visible: false,
      selectedBook: {}
    });
  };

  render() {
    const {
      visible, selectedBook, publication, categoryName
    } = this.state;
    return (
      <div className="exam-listing-page ui-bg-gradient">
        <Helmet>
          <title>{categoryName || 'Buy Books'}</title>
          <meta
            name="description"
            content="Buy Exam"
          />
        </Helmet>
        <div className="title">
          {categoryName || 'Select Exam'}
        </div>
        <div className="description">
          {categoryName ? 'select a book to see details' : 'for accessing books please select a exam'}
        </div>
        <div className="listing-page details">
          <ul>
            {
              publication && publication.map((book, index) => (categoryName ? (
                <li key={book.BookID} role="presentation" onClick={this.handleAction(book, index)}>
                  {book.BookTitle}
                </li>
              ) : (
                <li key={book.categoryName} role="presentation" onClick={this.handleAction(book, index)}>
                  {book.categoryName}
                </li>
              )))
            }
          </ul>
        </div>
        <Drawer
          title={selectedBook.PublisherName}
          placement="right"
          closable
          onClose={this.onClose}
          visible={visible}
          width="100%"
          destroyOnClose
        >
          <div className="exam-details-drawer books">
            <div className="book">
              <div className="title">
                {selectedBook.BookTitle}
              </div>
              <div className="book-img">
                <Picture src={config.bookImgPath + selectedBook.ImagePath} />
              </div>
              <div className="desc">
                <Descriptions title="Book Details">
                  <Descriptions.Item label="">{selectedBook.Descriptions}</Descriptions.Item>
                  <Descriptions.Item label="ISBN">{selectedBook.ISBN}</Descriptions.Item>
                  <Descriptions.Item label="MRP">₹{selectedBook.MRP}/- Only</Descriptions.Item>
                  <Descriptions.Item label="SellingPrice">₹{selectedBook.SellingPrice}/- Only</Descriptions.Item>

                </Descriptions>
              </div>
            </div>
            <div className="action-buttons">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Button block type="primary" onClick={this.handleBookBuy(selectedBook.FlipkartURL)}>
              Buy @ Flipkart
                  </Button>
                </Col>
                <Col span={12}>
                  <Button block type="primary" onClick={this.handleBookBuy(selectedBook.AmazonURL)}>
                    Buy @ Amazon
                  </Button>
                </Col>
              </Row>
            </div>
          </div>

        </Drawer>
      </div>
    );
  }
}
ExamList.propTypes = {
  history: PropTypes.any,
  getPublication: PropTypes.func,
  publication: PropTypes.object
};
