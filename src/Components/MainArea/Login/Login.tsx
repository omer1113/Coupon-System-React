import "./Login.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import UserDetails from "../../../Models/UserModel/userDetails";
import notify from "../../../Services/Notify";
import { loginAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import { Button } from 'reactstrap';
import UserModel from "../../../Models/UserModel/UserModel";

function Login(): JSX.Element {
    const history = useHistory();
    const {register,handleSubmit, errors} = useForm<UserDetails>();
    async function send(userDetails: UserDetails){
        try{
            const { data : response } : { data : string } = await axios.post(`http://localhost:8080/${userDetails.userType.toLowerCase()}/login`, userDetails);
            const userModel = new UserModel();
            userModel.token=response;
            userModel.email=userDetails.email;     
            userModel.userType=userDetails.userType;       
            store.dispatch(loginAction(userModel));
            notify.success("Welcome")
            history.push(`/${userDetails.userType.toLowerCase()}`);
        } catch{
            notify.error("Unable to login");
        }
    }

    const ref={register}
    return (
        <div className="Login">
            <h2> Login </h2><br/>
            <form onSubmit={handleSubmit(send)}>
                <label>Email </label> <br/>
                <input type="email" name="email" placeholder="example@example.com" ref={register({
                    required: {value:true , message:"Email not found"}
                })}/>
                <span><br/>{errors.email?.message}</span>
                <br/>
                <label>Password </label> <br/>
                <input type="password" name="password" placeholder="********" ref={register({
                     required: {value:true , message:"Password not found"}
                    })}/>
                <span><br/>{errors.password?.message}</span>
                <br/>
                <label>Choose your client type: </label><br/>
                <select name="userType" ref={register}>
                    <option value="CUSTOMER">Customer</option>
                    <option value="COMPANY">Company</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <br/><br/>
                <Button color="info" className="button">Login</Button>{' '}
            </form>
        </div>
    );
}

export default Login;