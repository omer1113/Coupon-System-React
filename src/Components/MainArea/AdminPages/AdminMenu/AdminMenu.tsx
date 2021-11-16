import "./AdminMenu.css";
import { NavLink } from "react-router-dom";

function AdminMenu(): JSX.Element {
    return (
        <div className="AdminMenu">
			<nav>
                <NavLink exact to="/admin/allCompanies">All Companies</NavLink> <br/><br/>
                <NavLink exact to="/admin/company/add">Add New Company</NavLink> <br/><br/>
                <NavLink exact to="/admin/allCustomers">All Customers</NavLink> <br/><br/>
                <NavLink exact to="/register">Add Customer</NavLink> <br/><br/>

            </nav>
        </div>
    );
}

export default AdminMenu;
