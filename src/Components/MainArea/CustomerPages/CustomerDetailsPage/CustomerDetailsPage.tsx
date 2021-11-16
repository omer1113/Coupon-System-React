import "./CustomerDetailsPage.css";
import {useEffect, useState} from 'react';
import jwtAxios from "../../../../Authorization/jwtAxios";
import Customer from "../../../../Models/BeanModel/Customer";


function CustomerDetailsPage(): JSX.Element {
    const [customer, setCustomer] = useState<Customer | undefined>();
    const fetchCustomer = async () => {
        try {
            const { data : customer } : { data : Customer } = await jwtAxios.get(`/customer/details`);
            setCustomer(customer);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCustomer();
    },)

    return !customer? null : (
        <div className="CustomerDetailsPage">
			<h2 className='customerTitle'>{customer.firstName} {customer.lastName} details:</h2>
            <h3 className='customerDetails'>
                ID: {customer.id} <br/>
                Email: {customer.email} <br/>
            </h3>
        </div>
    );
}

export default CustomerDetailsPage;
