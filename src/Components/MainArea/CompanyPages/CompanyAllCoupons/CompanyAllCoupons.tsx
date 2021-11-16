import "./CompanyAllCoupons.css";
import { useEffect, useState } from "react";
import CouponForCompany from "../../../../ModelTemplates/CouponForCompany/CouponForCompany";
import store from "../../../../Redux/Store";
import { couponDownloadAction } from "../../../../Redux/CouponState";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Coupon from "../../../../Models/BeanModel/Coupon";


function CompanyAllCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const fetchCoupons = async () => {
        try {

            const { data : coupons } : { data : Coupon[] } = await jwtAxios.get(`/company/allCoupons`);
            store.dispatch(couponDownloadAction(coupons));
            setCoupons(coupons);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCoupons();
    }, [])

    return (
        <div className="CompanyAllCoupons">
            <h2>All company logged in coupons:</h2>
			{coupons.map(item => <CouponForCompany key={item.id} coupon={item}/>)}
        </div>
    );
}

export default CompanyAllCoupons;