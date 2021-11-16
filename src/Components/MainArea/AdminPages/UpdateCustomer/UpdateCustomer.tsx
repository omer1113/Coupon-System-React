import "./UpdateCustomer.css";
import {useEffect, useState} from 'react';
import notify from "../../../../Services/Notify";
import store from "../../../../Redux/Store";
import { customerUpdateAction } from "../../../../Redux/CustomerState";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Customer from "../../../../Models/BeanModel/Customer";


interface UpdateCustomerProps {
   id:string;
}

function UpdateCustomer(props: UpdateCustomerProps): JSX.Element {
    const customerId = parseInt(props.id);
    const updateCustomerArray = store.getState().customerState.customers.filter(function (item){return item.id === customerId});
    const updateCustomer = updateCustomerArray[0];

    const [updatedEmail, setUpdatedEmail] = useState<string>(updateCustomer.email);
    const [updatedPassword, setUpdatedPassword] = useState<string>(updateCustomer.password);
      
    const {register, handleSubmit, errors} = useForm<Customer>();
    const history = useHistory();
    async function send(customer:Customer){
        customer.id = customerId;
        customer.firstName=updateCustomer.firstName;
        customer.lastName=updateCustomer.lastName;
        customer.email=updatedEmail;
        customer.password=updatedPassword;
        customer.coupons=updateCustomer.coupons;
        try{  
            console.log(customer);
            await jwtAxios.put<Customer>("http://localhost:8080/admin/customer/update",customer);
            store.dispatch(customerUpdateAction(customer));
            notify.success("Customer updated successfully!");
            history.push("/");
        } catch {
            notify.error("There was a problem with updating this customer");
        }
    }

    useEffect(()=>{ 
    }, [])
    
    const ref={register}
    return (
       <div className="UpdateCustomer">
     <h2>Update Customer</h2>
           <form onSubmit={handleSubmit(send)}>
               <input type="text" name="id" value={updateCustomer.id} ref={register({
               })} disabled/>
               <br/><br/>
               <input type="text" name="firstName" defaultValue={updateCustomer.firstName} onChange={e => setUpdatedFirstName(e.target.value)} ref={register({
                required: {value:true , message:"Customer first name not found"}
               })} /><br/><br/>
               <input type="text" name="lastName" defaultValue={updateCustomer.lastName} onChange={e => setUpdatedLastName(e.target.value)} ref={register({
                required: {value:true , message:"Customer last name not found"}
               })} />
               <br/><br/>
               <input type="email" name="email" defaultValue={updateCustomer.email} onChange={e =>setUpdatedEmail(e.target.value)} ref={register({
               required: {value:true , message:"Customer Email not found"}
               })}/>
               <span><br/>{errors.email?.message}</span>
               <br/><br/>
               <input type="password" name="password" defaultValue={updateCustomer.password} onChange={e =>setUpdatedPassword(e.target.value)} ref={register({
               required: {value:true , message:"Customer password not found"}
               })}/>
               <span><br/>{errors.password?.message}</span>
               <br/><br/>
               <button>Update</button>
           </form>
       </div>
   );
}



 export default UpdateCustomer;
function setUpdatedFirstName(value: string): void {
    throw new Error("Function not implemented.");
}

function setUpdatedLastName(value: string): void {
    throw new Error("Function not implemented.");
}

