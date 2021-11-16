import "./CustomerTemplate.css";
import couponImage from "../../Assets/customer.jpg";
import notify from "../../Services/Notify";
import store from "../../Redux/Store";
import { customerDeleteAction } from "../../Redux/CustomerState";
import { useHistory } from "react-router-dom";
import jwtAxios from "../../Authorization/jwtAxios";
import Customer from "../../Models/BeanModel/Customer";


interface CustomerTemplateProps {
	customer : Customer;
}

function CustomerTemplate(props:CustomerTemplateProps): JSX.Element {
    const history = useHistory();

    const deleteCustomer = async () => {
        try {
            await jwtAxios.delete(`/admin/customer/delete/${props.customer.id}`);
            notify.success("Customer was deleted successfully");
            store.dispatch(customerDeleteAction(props.customer))
            history.push("/admin/allCustomers");
        } catch {
            notify.error("Unable to delete customer");
        }
    }

    const editCustomer = () => {
        history.push("/admin/customer/update/"+props.customer.id);
    }

    return (
        <div className="CustomerTemplate">
			<div className="customerCard column">
                <img src={couponImage} alt="Customer"/>
                <h1>{props.customer.firstName} {props.customer.lastName}</h1>
                <p className="customerEmail">{props.customer.email}</p>
                <p>id: {props.customer.id} </p>
                <button onClick={editCustomer}>Edit details</button>
                <button onClick={deleteCustomer}>Delete</button>
                </div>
        </div>
    );
}

export default CustomerTemplate;
