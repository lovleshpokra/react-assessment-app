import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Button from 'antd/es/button';
import Input from 'antd/es/input';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style/css';
import 'antd/es/row/style/css';
import 'antd/es/input/style/css';
import 'antd/es/col/style/css';
import 'antd/es/button/style/css';
import './style.scss';
import config from '../../app-config';

const { Search } = Input;

export default class ExamList extends React.PureComponent {
  componentDidMount() {
    const { getPlanDetails, match } = this.props;
    getPlanDetails(match.params.packageId);
  }

  handleProceedClick = () => {
    const { history } = this.props;
    history.push('/auth');
  }

  handleApplyPromoCode = (code) => {
    if (code) {
      const { applyPromoCode, packageDetail: { Fees } } = this.props;
      applyPromoCode({ code, amount: Fees });
    }
  }

  handleRemovePromoCode = () => {
    const { removePromoCode } = this.props;
    removePromoCode();
  }

  render() {
    const {
      packageDetail: {
        OrgPlanCode, OrgPlanName, PlanMRP, TotalExam, Fees, StartDate, EndDate, ImageURL, CourseName
      }, discount: { amt, error }
    } = this.props;
    let discount = PlanMRP - Fees; let
      totalAmt = Fees;
    let isDiscountApplied = false;
    if (amt && amt.discount_amount) {
      discount = parseInt(discount + amt.discount_amount);
      totalAmt = parseInt(Fees - amt.discount_amount);
      isDiscountApplied = true;
    }
    return (
      <div className="packages-details-page">
        <Helmet>
          <title>{OrgPlanName}</title>
          <meta
            name="description"
            content="Package Details"
          />
        </Helmet>
        <div className="package-details">
          <div className="title">
            {CourseName}
            <span>
              {OrgPlanName}
            </span>
          </div>
          <div className="desc">
            <div className="bottom-border">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="item">
                    <div>Start Date:</div>
                    <div>{StartDate}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="item">
                    <div>End Date:</div>
                    <div>{EndDate}</div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="bottom-border"><b>Price:</b> ₹{PlanMRP}/-</div>
            <div className="bottom-border"><b>Discount:</b> ₹{discount}/-</div>
            <div className="bottom-border"><b>Payable Amount:</b> ₹{totalAmt}/-</div>
            {!isDiscountApplied ? (
              <div className="promo-code">
                <Search
                  size="large"
                  placeholder="Apply Promo Code"
                  enterButton={<Icon type="check" />}
                  onSearch={this.handleApplyPromoCode}
                />
                {error && error.Message ? <span className="promo-error">{error.Message}</span> : ''}
              </div>
            ) : (
              <div className="promo-code">
                <div className="promo-applied">Promo Code applied successfully!
                  <span onClick={this.handleRemovePromoCode}>x</span>
                </div>
              </div>
            )}

          </div>
          <div className="action-buttons">
            <Button block type="primary" className="checkout-btn">
                  Checkout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
ExamList.propTypes = {
  match: PropTypes.object,
  history: PropTypes.any,
  getPlanDetails: PropTypes.func,
  packageDetail: PropTypes.object,
  discount: PropTypes.object,
  applyPromoCode: PropTypes.func,
  removePromoCode: PropTypes.func
};
