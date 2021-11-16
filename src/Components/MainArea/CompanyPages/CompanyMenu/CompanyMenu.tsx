import "./CompanyMenu.css";
import { NavLink } from "react-router-dom";
import jwtAxios from "../../../../Authorization/jwtAxios";
import store from "../../../../Redux/Store";
import { companyDownloadAction } from "../../../../Redux/CompanyState";
import { useEffect } from "react";
import Company from "../../../../Models/BeanModel/Company";

function CompanyMenu(): JSX.Element {
    const fetchCompanies = async () => {
        try {
            const { data : companies } : { data : Company[] } = await jwtAxios.get(`/admin/allCompanies`);
            store.dispatch(companyDownloadAction(companies));
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCompanies();
    }, [])
    
    return (
        <div className="CompanyMenu">
			<nav>
                <NavLink exact to="/company/allCoupons">All Coupons</NavLink> <br/><br/>
                <NavLink exact to="/company/addCoupon">Add New Coupon</NavLink> <br/><br/>
                <NavLink exact to="/company/details">Company Details</NavLink> <br/><br/>
                <NavLink exact to="/company/maxPrice/:maxPrice">Coupons by max price</NavLink> <br/><br/>
                <NavLink exact to="/company/category/:category">Coupons by category</NavLink> <br/><br/>
            </nav>
        </div>
    );
}

export default CompanyMenu;
