import "./CompanyTemplate.css";
import couponImage from "../../Assets/company.jpg";
import notify from "../../Services/Notify";
import store from "../../Redux/Store";
import { companyDeleteAction } from "../../Redux/CompanyState";
import { useHistory } from "react-router-dom";
import jwtAxios from "../../Authorization/jwtAxios";
import Company from "../../Models/BeanModel/Company";

interface CompanyTemplateProps {
	company : Company;
}

function CompanyTemplate(props: CompanyTemplateProps): JSX.Element {
    const history = useHistory();
    const deleteCompany = async () => {
        try {
            await jwtAxios.delete(`/admin/company/deleteCoupon/${props.company.id}`);
            notify.success("Company deleted successfully");
            store.dispatch(companyDeleteAction(props.company))
            history.push("/");
        } catch {
            notify.error("Could not delete company");
        }
    }

    const editCompany = () => {
        history.push("/admin/company/update/"+props.company.id);
    }

    return (
        <div className="CompanyTemplate">
			<div className="companyCard column">
                <img src={couponImage} alt="Company" />
                <h1>{props.company.name}</h1>
                <p className="companyEmail">{props.company.email}</p>
                <p>id: {props.company.id} </p>
                <button onClick={editCompany}>Edit details</button>
                <button onClick={deleteCompany}>Delete</button> 
                </div>
        </div>
    );
}

export default CompanyTemplate;
