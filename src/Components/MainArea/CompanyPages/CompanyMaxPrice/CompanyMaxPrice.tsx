import { SyntheticEvent, useEffect, useState } from "react";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Coupon from "../../../../Models/BeanModel/Coupon";
import CouponForCompany from "../../../../ModelTemplates/CouponForCompany/CouponForCompany";
import { companyUpdateAction } from "../../../../Redux/CompanyState";
import store from "../../../../Redux/Store";
import "./CompanyMaxPrice.css";

function CompanyMaxPrice(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const fetchCoupons = async () => {
        try {
            const { data : coupons } : { data : Coupon[] } = await jwtAxios.get(`/company/allCoupons`);
            const companyEmail = store.getState().authState.user.email;
            const loggedCompanyArray = store.getState().companyState.companies.filter(function(item){return item.email === companyEmail});
            const loggedCompany = loggedCompanyArray[0];
            loggedCompany.coupons = coupons;
            store.dispatch(companyUpdateAction(loggedCompany));
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
        <div className="CompanyMaxPrice">
            <h2>Choose Max Price:</h2>
			<input type="range" min="0" max="2000" onChange={setValue} className="slider" style={{width: "20%"}}/>
            <h2 className="slider__right-value">{maxVal}</h2><br/>

            {priceCoupons.map(item => <CouponForCompany key={item.id} coupon={item}/>)}
        </div>
        
    );
}

export default CompanyMaxPrice;
