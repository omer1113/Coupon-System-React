import "./CompanyCategoryCoupons.css";
import CouponForCompany from "../../../../ModelTemplates/CouponForCompany/CouponForCompany";
import store from "../../../../Redux/Store";
import {useParams} from "react-router-dom";


function CompanyCategoryCoupons(): JSX.Element {
    const category = useParams();
    const companyEmail = store.getState().authState.user.email;
    const loggedCompanyArray = store.getState().companyState.companies.filter(function(item){return item.email === companyEmail});
    const loggedCompany = loggedCompanyArray[0];
    const coupons = loggedCompany.coupons;
    const categoryCoupons = coupons.filter(function(item:any) {return item.category === category});

    return (
        <div className="CompanyCategoryCoupons row">        
            {categoryCoupons.map((item:any) => <CouponForCompany key={item.id} coupon={item}/>)}
        </div>
    );
}

export default CompanyCategoryCoupons;
