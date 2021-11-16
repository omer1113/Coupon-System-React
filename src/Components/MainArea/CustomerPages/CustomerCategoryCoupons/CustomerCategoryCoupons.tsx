import "./CustomerCategoryCoupons.css";
import {useParams} from "react-router-dom";
import store from "../../../../Redux/Store";
import CouponForCustomer from "../../../../ModelTemplates/CouponForCustomer/CouponForCustomer";
import React  from 'react';


function CustomerCategoryCoupons(): JSX.Element {
    const category = useParams();
    const customerEmail = store.getState().authState.user.email;
    const loggedCustomerArray = store.getState().customerState.customers.filter(function(item){return item.email === customerEmail});
    const loggedCustomer = loggedCustomerArray[0];
    const coupons = loggedCustomer.coupons;
    const categoryCoupons = coupons.filter(function(item:any) {return item.category === category});

    return (
        <div className="CustomerCategoryCoupons row">
            {categoryCoupons.map((item:any) => <CouponForCustomer key={item.id} coupon={item}/>)}
        </div>
    );
}

export default CustomerCategoryCoupons;