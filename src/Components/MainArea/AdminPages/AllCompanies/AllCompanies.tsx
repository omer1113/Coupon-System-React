import "./AllCompanies.css";
import {useEffect, useState} from 'react';
import CompanyTemplate from "../../../../ModelTemplates/CompanyTemplate/CompanyTemplate";
import store from "../../../../Redux/Store";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Company from "../../../../Models/BeanModel/Company";


function AllCompanies(): JSX.Element {
    const [companies, setCompanies] = useState<Company[]>([]);
    const fetchCompanies = async () => {
        try {
            const { data : companies } : { data : Company[] } = await jwtAxios.get(`/admin/allCompanies`);
            setCompanies(companies);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCompanies();
    }, [])

    return (
        <div className="AllCompanies row">
			{companies.map(item => <CompanyTemplate key={item.id} company={item}/>)}
        </div>
    );
}

export default AllCompanies;
