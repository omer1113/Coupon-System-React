import "./CouponForCompany.css";
import company from "../../Assets/company.jpg";
import Coupon from "../../Models/BeanModel/Coupon";
import { useHistory } from "react-router-dom";
import notify from "../../Services/Notify";
import store from "../../Redux/Store";
import { couponDeleteAction } from "../../Redux/CouponState";
import jwtAxios from "../../Authorization/jwtAxios";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import couponImg from "../../Assets/coupon.png";

interface CouponForCompanyProps {
	coupon : Coupon;
}

function CouponForCompany(props: CouponForCompanyProps): JSX.Element {
    const history = useHistory();
    const deleteCoupon = async () => {
        try {
            await jwtAxios.delete(`/company/deleteCoupon/${props.coupon.id}`);
            notify.success("Coupon deleted successfully");
            store.dispatch(couponDeleteAction(props.coupon));
            history.push("/company/allCoupons")
        } catch {
            notify.error("Unable to delete coupon");
        }
    }

    const editCoupon = () => {
        history.push("/company/update/"+props.coupon.id);
    }

    return (
        <div className="CouponForCompany">
            <Card className="column" style={{flex: 1}}>
                <CardImg top width="100%" src={couponImg} alt="Card image cap" className="CardImg" />
                <CardBody>
                    <CardTitle tag="h5">{props.coupon.title}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{props.coupon.price}₪</CardSubtitle>
                    <CardText>{props.coupon.description}</CardText>
                    <Button size="sm" onClick={() => editCoupon()}>Edit Details</Button><br/>
                    <Button size="sm" onClick={() => deleteCoupon()}>Delete</Button>
                </CardBody>
            </Card>
        </div>
    );
}

export default CouponForCompany;
