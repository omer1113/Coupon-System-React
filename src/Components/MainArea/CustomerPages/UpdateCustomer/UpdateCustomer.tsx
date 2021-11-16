import "./UpdateCustomer.css";
import { useEffect, useState} from 'react';
import notify from "../../../../Services/Notify";
import store from "../../../../Redux/Store";
import { customerUpdateAction } from "../../../../Redux/CustomerState";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Coupon from "../../../../Models/BeanModel/Coupon";
import Customer from "../../../../Models/BeanModel/Customer";


interface UpdateCustomerProps {
    id:string;
 }
function UpdateCustomer(props: UpdateCustomerProps): JSX.Element {
    const customerID = parseInt(props.id);
    const updateCustomerArray = store.getState().customerState.customers.filter(function (item){return item.id === customerID});
    const updateCustomer = updateCustomerArray[0];

    const [updatedEmail, setUpdatedEmail] = useState<string>(updateCustomer.email);
    const [updatedPassword, setUpdatedPassword] = useState<string>(updateCustomer.password);
    const [updatedFirstName, setUpdatedFirstName] = useState<string>(updateCustomer.firstName);
    const [updatedLastName, setUpdatedLastName] = useState<string>(updateCustomer.lastName);   
    const [updatedCoupons, setUpdatedCoupons] = (updateCustomer.coupons);   


    const {register, handleSubmit, errors} = useForm<Customer>();
    const history = useHistory();
    async function send(customer:Customer){
       customer.id = customerID;
       customer.firstName=updatedFirstName;
       customer.lastName=updatedLastName;
       customer.email=updatedEmail;
       customer.password=updatedPassword;
       customer.coupons=updateCustomer.coupons;
       try{  
           await jwtAxios.put<Customer>("http://localhost:8080/admin/customer/update",customer);
           store.dispatch(customerUpdateAction(customer));
           notify.success("Customer update successfully!");
           history.push("/");
       } catch {
           notify.error("There was a problem with updating the details!");
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
                required: {value:true , message:"First name not found"}
               })} /><br/><br/>
               <input type="text" name="lastName" defaultValue={updateCustomer.lastName} onChange={e => setUpdatedLastName(e.target.value)} ref={register({
                required: {value:true , message:"Last name not found"}
               })} />
               <br/><br/>
               <input type="email" name="email" defaultValue={updateCustomer.email} onChange={e =>setUpdatedEmail(e.target.value)} ref={register({
               required: {value:true , message:"Email not found"}
               })}/>
               <span><br/>{errors.email?.message}</span>
               <br/><br/>
               <input type="password" name="password" defaultValue={updateCustomer.password} onChange={e =>setUpdatedPassword(e.target.value)} ref={register({
               required: {value:true , message:"Password not found"}
               })}/>
               <span><br/>{errors.password?.message}</span>
               <br/><br/>
               <button>Update</button>
           </form>
       </div>
   );
}

export default UpdateCustomer;
