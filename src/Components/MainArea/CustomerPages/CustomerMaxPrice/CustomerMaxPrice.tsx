import "./CustomerMaxPrice.css";
import { SyntheticEvent, useEffect, useState } from "react";
import jwtAxios from "../../../../Authorization/jwtAxios";
import CouponForCustomer from "../../../../ModelTemplates/CouponForCustomer/CouponForCustomer";
import { customerUpdateAction } from "../../../../Redux/CustomerState";
import store from "../../../../Redux/Store";
import Coupon from "../../../../Models/BeanModel/Coupon";

function CustomerMaxPrice(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const fetchCoupons = async () => {
        try {
            const { data : coupons } : { data : Coupon[] } = await jwtAxios.get(`/customer/allCoupons`);
            const customerEmail = store.getState().authState.user.email;
            const loggedCustomerArray = store.getState().customerState.customers.filter(function(item){return item.email === customerEmail});
            const loggedCustomer = loggedCustomerArray[0];
            loggedCustomer.coupons = coupons;
            store.dispatch(customerUpdateAction(loggedCustomer));
            setCoupons(coupons);
        } catch(e) {
            console.log(e)
        }
    }
    const [maxVal, setMaxVal] = useState(0);
    const setValue = (args: SyntheticEvent) => {
        const value = (args.target as HTMLInputElement).value;
        setMaxVal(parseInt(value));
    }
    const priceCoupons = coupons.filter(function(item) {return item.price <= maxVal});
    
    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <div className="CustomerMaxPrice">
            <h2>Choose Max Price:</h2>
			<input type="range" min="0" max="2000" onChange={setValue} className="slider" style={{width: "20%"}}/>
            <h2 className="slider__right-value">{maxVal}</h2><br/>

            {priceCoupons.map(item => <CouponForCustomer key={item.id} coupon={item}/>)}
        </div>
        
    );
}

export default CustomerMaxPrice;
