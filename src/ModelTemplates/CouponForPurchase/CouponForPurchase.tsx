import "./CouponForPurchase.css";
import jwtAxios from "../../Authorization/jwtAxios";
import notify from "../../Services/Notify";
import store from "../../Redux/Store";
import { couponUpdateAction } from "../../Redux/CouponState";
import { customerUpdateAction } from "../../Redux/CustomerState";
import { Redirect } from "react-router-dom";
import { Component }  from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import coupon from "../../Assets/coupon.png";
import Coupon from "../../Models/BeanModel/Coupon";
 
interface CouponForPurchaseState {
    userLogged : boolean;
    route: string;
}

interface CouponForPurchaseProps {
	coupon : Coupon;
    currentURL : string;
}

class CouponForPurchase extends Component<CouponForPurchaseProps, CouponForPurchaseState> {
    public constructor(props: CouponForPurchaseProps) {
        super(props);
        this.state = {
            userLogged: store.getState().authState.isLogged,
            route: this.props.currentURL
        };
        store.subscribe(() => {
            this.setState({
                userLogged: store.getState().authState.isLogged
            });
        })
    }

    public purchaseCoupon = async (coupon:Coupon) => {
        try{
            const response = await jwtAxios.post<Coupon>("http://localhost:8080/customer/purchaseCoupon",coupon);
            coupon.amount=coupon.amount-1;
            store.dispatch(couponUpdateAction(coupon));
            const customerEmail = store.getState().authState.user.email;
            const loggedCustomerArray=store.getState().customerState.customers.filter(function(item){return item.email === customerEmail});
            const loggedCustomer = loggedCustomerArray[0];
            loggedCustomer.coupons.push(coupon);
            store.dispatch(customerUpdateAction(loggedCustomer));
            this.setState({route: "/customer/allCoupons"})
            console.log(response);
            notify.success("Coupon was purchase successfully");
        } catch {
            notify.error("Unable to purchase coupon");
        }
    }

    private loginRoute = () => {
        this.setState({
            route: "/login"
        })
    }

    public render(): JSX.Element {
        if (this.state.userLogged){
            return (
                <div className="CouponForPurchase">
                    <Card className="column" style={{flex: 1}}>
                        <CardImg top width="100%" src={coupon} alt="Card image cap" className="CardImg" />
                        <CardBody>
                            <CardTitle  tag="h5">{this.props.coupon.title}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Price for each coupon: {this.props.coupon.price}₪</CardSubtitle>
                            <CardText> Coupon description: {this.props.coupon.description}</CardText>
                            <CardText> Amount: {this.props.coupon.amount}</CardText>
                            <Button onClick={() => this.purchaseCoupon(this.props.coupon)}>Add to cart</Button>
                        </CardBody>
                    </Card>
                </div>
            );
        } else{
            return (
                <div className="CouponForPurchase">
                    <Card className="column" style={{flex: 1}}>
                        <CardImg top width="100%" src={coupon} alt="Card image cap" />
                        <CardBody>
                            <CardTitle  tag="h5">{this.props.coupon.title}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Price for each coupon: {this.props.coupon.price}₪</CardSubtitle>
                            <CardText> Coupon description: {this.props.coupon.description}</CardText>
                            <CardText> Amount: {this.props.coupon.amount}</CardText>
                            <Button onClick={() => this.loginRoute()}>Add to cart</Button>
                        </CardBody>
                    </Card>
                </div>
            );
         }
    }
}
 
export default CouponForPurchase;
