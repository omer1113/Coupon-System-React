import "./CustomerMenu.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import store from "../../../../Redux/Store";
import jwtAxios from "../../../../Authorization/jwtAxios";
import { customerDownloadAction } from "../../../../Redux/CustomerState";
import Customer from "../../../../Models/BeanModel/Customer";

function CustomerMenu(): JSX.Element {
    const fetchCustomers = async () => {
        try {
            const { data : customers } : { data : Customer[] } = await jwtAxios.get(`/admin/allCustomers`);
            store.dispatch(customerDownloadAction(customers));
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    return (
        <div className="CustomerMenu">
			<nav>
                <NavLink exact to="/customer/details">Customer Details</NavLink> <br/><br/>
                <NavLink exact to="/customer/allCoupons">All Purchased Coupons</NavLink> <br/><br/>
                <NavLink exact to="/customer/maxPrice">Purchased coupons by max price</NavLink> <br/><br/>
                <NavLink exact to="/customer/categoryMenu">Purchased coupons by category</NavLink> <br/><br/>
            </nav>
        </div>
    );
}

export default CustomerMenu;
