import "./AddCoupon.css";
import { useForm } from "react-hook-form";
import notify from "../../../../Services/Notify";
import { useHistory } from "react-router-dom";
import axios from "axios";
import store from "../../../../Redux/Store";
import { couponAddAction } from "../../../../Redux/CouponState";
import jwtAxios from "../../../../Authorization/jwtAxios";
import Coupon from "../../../../Models/BeanModel/Coupon";


function AddCoupon(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<Coupon>();
    const history = useHistory();

    async function send(coupon:Coupon){
        try{
           // const imgResponse = await axios.post<string>("http://localhost:8080/file/upload",coupon.image);
           // coupon.image = imgResponse.data;
            const response = await jwtAxios.post<Coupon>("http://localhost:8080/company/addCoupon",coupon);
            
            notify.success("New coupon added successfully");
            store.dispatch(couponAddAction(coupon));
            history.push("/company/allCoupons");
        } catch {
            notify.error("Unable to add coupon");
        }
    }
    
    const ref={register}
    return (
        <div className="AddCoupon">
			<h2>Add New Coupon</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Choose a coupon category: </label>
                <select name="category" ref={register}>
                    <option value="" disabled>--Please choose a category--</option>
                    <option value="FOOD" >Food</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="VACATION">Vacation</option>
               </select>
                <br/><br/>
                <input type="text" name="title" placeholder="Coupon Title" ref={register({
                    required: {value:true , message:"Company title not found"},
                    minLength: {value:2 , message:"A minimum of two characters is required for the title length"}
                })}/>
                <span><br/>{errors.title?.message}</span>
                <br/><br/>
                <input type="text" name="description" placeholder="Coupon Description" ref={register({
                    required: {value:true , message:"Coupon description not found"}
                })}/>
                <span><br/>{errors.description?.message}</span>
                <br/><br/>
                <input type="text" name="startDate" placeholder="Coupon Start Date (YYYY-MM-DD)" ref={register({
                    required: {value:true , message:"Coupon start date not found"}
                })}/>
                <span><br/>{errors.startDate?.message}</span>
                <br/><br/>
                <input type="text" name="endDate" placeholder="Coupon End Date (YYYY-MM-DD)" ref={register({
                    required: {value:true , message:"Coupon end date not found"}
                })}/>
                <span><br/>{errors.endDate?.message}</span>
                <br/><br/>
                <input type="number" name="price" placeholder="Coupon Price" ref={register({
                    required: {value:true , message:"Coupon price not found"}
                })}/>
                <span><br/>{errors.price?.message}</span>
                <br/><br/>
                <input type="number" name="amount" placeholder="Coupon Amount" ref={register({
                    required: {value:true , message:"Coupon amount not found"}
                })}/>
                <span><br/>{errors.startDate?.message}</span>
                <br/><br/>
                {/*<input type="file" name="image" placeholder="Coupon Image" ref={register({
                     required: {value:true , message:"Coupon image not found"}
                    })}/>
                <span><br/>{errors.image?.message}</span>
                <br/><br/> */}
                <button>add Coupon</button>
            </form>
        </div>
    );
}

export default AddCoupon;
