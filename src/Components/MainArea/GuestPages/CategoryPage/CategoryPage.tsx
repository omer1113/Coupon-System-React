import "./CategoryPage.css";
import {useParams} from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from 'react';
import CouponForPurchase from "../../../../ModelTemplates/CouponForPurchase/CouponForPurchase";
import { Row, Col,Container } from "reactstrap";
import Coupon from "../../../../Models/BeanModel/Coupon";


function CategoryPage(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    // @ts-ignore -> useParams returns an object
    const {categoryName} = useParams();
    const fetchCoupons = async () => {
        try {
            const { data : coupons } : { data : Coupon[] } = await axios.get(`/category/${categoryName}`);
            setCoupons(coupons);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCoupons();
    }, [categoryName])

    return (
        <div className="CategoryPage" >
            <h2 className='categoryTitle'>{categoryName}</h2>
                {coupons.map(item => <CouponForPurchase key={item.id} coupon={item} currentURL={`/category/${categoryName}`}/>)}
        </div>
    );
}

export default CategoryPage;
