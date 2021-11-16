import "./UpdateCompany.css";
import {useEffect, useState} from 'react';
import notify from "../../../../Services/Notify";
import store from "../../../../Redux/Store";
import { companyUpdateAction } from "../../../../Redux/CompanyState";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Company from "../../../../Models/BeanModel/Company";

interface UpdateCompanyProps {
   id:string;
}

function UpdateCompany(props: UpdateCompanyProps): JSX.Element {
    const companyId = parseInt(props.id);
    const updateCompanyArray = store.getState().companyState.companies.filter(function (item){return item.id === companyId});
    const updateCompany = updateCompanyArray[0];

    const [updatedEmail, setUpdatedEmail] = useState<string>(updateCompany.email);
    const [updatedPassword, setUpdatedPassword] = useState<string>(updateCompany.password);
      
    const {register, handleSubmit, errors} = useForm<Company>();
    const history = useHistory();
    async function send(company:Company){
        company.id = companyId;
        company.name=updateCompany.name;
        company.email=updatedEmail;
        company.password=updatedPassword;
        company.coupons=updateCompany.coupons;
        try{  
            console.log(company);
            await jwtAxios.put<Company>("http://localhost:8080/admin/company/update",company);
            store.dispatch(companyUpdateAction(company));
            notify.success("Company update successfully!");
            history.push("/administrator/allCompanies");
        } catch {
            notify.error("There was a problem with updating this company");
        }
    }

    useEffect(()=>{ 
    }, [])
    
    const ref={register}
    return (
        <div className="UpdateCompany">
			<h2>Update Company:</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="text" name="id" value={parseInt(props.id)} ref={register({
                })} disabled/>
                <br/><br/>
                <input type="text" name="name" value={updateCompany.name} ref={register({
                })} disabled/>
                <br/><br/>
                <input type="text" name="email" defaultValue={updateCompany.email} onChange={e =>setUpdatedEmail(e.target.value)} ref={register({
                required: {value:true , message:"Company Email address not found"}
                })}/>
                <span><br/>{errors.email?.message}</span>
                <br/><br/>
                <input type="password" name="password" defaultValue={updateCompany.password} onChange={e =>setUpdatedPassword(e.target.value)} ref={register({
                required: {value:true , message:"Company password not found"}
                })}/>
                <span><br/>{errors.password?.message}</span>
                <br/><br/>
                <button>Update</button>
            </form>
        </div>
    );
}

 export default UpdateCompany;
