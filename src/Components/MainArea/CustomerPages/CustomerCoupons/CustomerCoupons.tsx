import "./CustomerCoupons.css";
import {useEffect, useState} from 'react';
import CouponForCustomer from "../../../../ModelTemplates/CouponForCustomer/CouponForCustomer";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Coupon from "../../../../Models/BeanModel/Coupon";

function CustomerCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const fetchCoupons = async () => {
        try {
            const { data : coupons } : { data : Coupon[] } = await jwtAxios.get(`/customer/allCoupons`);
            setCoupons(coupons);
        } catch(e) {
            console.log(e)
        }
    }
    
    useEffect(() => {
        fetchCoupons();
    }, [])

    return (
        <div className="CustomerCoupons">
			<h2 className='customerTitle'>Purchased Coupons:</h2>
            {coupons.map(item => <CouponForCustomer key={item.id} coupon={item}/>)}
        </div>
    );
}

export default CustomerCoupons;
