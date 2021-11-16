import "./Register.css";
import { useForm } from "react-hook-form";
import notify from "../../../../Notify";
import { useHistory } from "react-router-dom";
import axios from "axios";
import store from "../../../../Redux/Store";
import { customerAddAction } from "../../../../Redux/CustomerState";
import { Button } from 'reactstrap';
import Customer from "../../../../Models/BeanModel/Customer";

function Register(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<Customer>();
    const history = useHistory();

    async function send(customer:Customer){
        try{
            const response = await axios.post<Customer>("http://localhost:8080/register",customer);//it was jwtAxios
            notify.success("Registration was successful!");
            store.dispatch(customerAddAction(customer));
            history.push("/");
        } catch {
            notify.error("There was a problem with registration!");
        }
    }
    
    const ref={register}
    return (
        <div className="Register">
			<h2>Add Customer</h2><br/>
            <form onSubmit={handleSubmit(send)}>
                <label>First Name </label> <br/>
                <input type="text" name="firstName" placeholder="First Name" ref={register({
                    required: {value:true , message:"Missing first name!"},
                    minLength: {value:2 , message:"Minimum first name length is two characters!"}
                })}/>
                <span><br/>{errors.firstName?.message}</span><br/>
                <label>Last Name </label> <br/>          
                <input type="text" name="lastName" placeholder="Last Name" ref={register({
                    required: {value:true , message:"Missing last name!"},
                    minLength: {value:2 , message:"Minimum last name length is two characters!"}
                })}/>
                <span><br/>{errors.lastName?.message}</span><br/>
                <label>Email </label> <br/>
                <input type="email" name="email" placeholder="example@example.com" ref={register({
                    required: {value:true , message:"Missing email!"}
                })}/>
                <span><br/>{errors.email?.message}</span><br/>
                <label>Password </label> <br/>
                <input type="password" name="password" placeholder="********" ref={register({
                     required: {value:true , message:"Missing password!"}
                    })}/>
                <span><br/>{errors.password?.message}</span><br/>
                <Button color="info" className="button">Register</Button>{' '}
            </form>
        </div>
    );
}

export default Register;