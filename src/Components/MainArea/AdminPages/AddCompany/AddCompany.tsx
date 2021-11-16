import "./AddCompany.css";
import { useForm } from "react-hook-form";
import notify from "../../../../Services/Notify";
import { useHistory } from "react-router-dom";
import store from "../../../../Redux/Store";
import { companyAddAction } from "../../../../Redux/CompanyState";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Company from "../../../../Models/BeanModel/Company";

function AddCompany(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<Company>();
    const history = useHistory();

    async function send(company:Company){
        try{
            const response = await jwtAxios.post<Company>("http://localhost:8080/admin/company/add",company);
            console.log(response);
            store.dispatch(companyAddAction(company));
            notify.success("New company added successfully");
            history.push("/admin/allCompanies");
        } catch {
            notify.error("Unable to add company");
        }
    }
    
    const ref={register}
    return (
        <div className="addCompany">
			<h2>Add New Company</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="text" name="name" placeholder="Company Name" ref={register({
                    required: {value:true , message:"Company name not found"},
                    minLength: {value:2 , message:"Minimum name length of two characters is required"}
                })}/>
                <span><br/>{errors.name?.message}</span>
                <br/><br/>
                <input type="email" name="email" placeholder="Company Email" ref={register({
                    required: {value:true , message:"Company email not found"}
                })}/>
                <span><br/>{errors.email?.message}</span>
                <br/><br/>
                <input type="password" name="password" placeholder="Company Password" ref={register({
                     required: {value:true , message:"Company password not found"}
                    })}/>
                <span><br/>{errors.password?.message}</span>
                <br/><br/>
                <button>Add Company</button>
            </form>
        </div>
    );
}

export default AddCompany;

