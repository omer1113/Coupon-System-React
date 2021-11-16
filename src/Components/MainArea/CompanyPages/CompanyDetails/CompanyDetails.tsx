import "./CompanyDetails.css";
import { useEffect, useState} from 'react';
//import CompanyTemplate from "../../../../ModelTemplates/CompanyTemplate/CompanyTemplate";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Company from "../../../../Models/BeanModel/Company";


function CompanyDetails(): JSX.Element {
    const [company, setCompany] = useState<Company | undefined>();
    const fetchCompany = async () => {
        try {
            const { data : company } : { data : Company } = await jwtAxios.get(`/company/details`);
            setCompany(company);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCompany();
    },)

    return !company? null : (
        <div className="CompanyDetailsPage">
            <h2 className='companyTitle'>{company.name} details:</h2>
            <h3 className='companyDetails'>
                ID:{company.id}<br/>
                Email:{company.email}<br/>
            </h3>
            
        </div>
    );
}

export default CompanyDetails;