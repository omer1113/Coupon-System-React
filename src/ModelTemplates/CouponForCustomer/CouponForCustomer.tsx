import "./CouponForCustomer.css";
import Coupon from "../../Models/BeanModel/Coupon";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';
import couponImg from "../../Assets/coupon.png";

interface CouponForCustomerProps {
	coupon : Coupon;
}

//The customer's coupons


function CouponForCustomer(props: CouponForCustomerProps): JSX.Element {
    return (
        <div className="CouponForCustomer">
            <Card className="column" style={{flex: 1}}>
                <CardImg top width="100%" src={couponImg} alt="Card image" />
                <CardBody>
                    <CardTitle tag="h5">{props.coupon.title}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Price: {props.coupon.price}</CardSubtitle>
                    <CardText>Description: {props.coupon.description}</CardText>
                    <CardText>Coupon Amount: {props.coupon.amount}</CardText>
                    <CardText>Start date: {props.coupon.startDate}</CardText>
                    <CardText>End date: {props.coupon.endDate}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

export default CouponForCustomer;