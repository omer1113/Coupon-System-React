import { authReducer } from './AuthState';
import { combineReducers, createStore } from "redux";
import { companyReducer } from "./CompanyState";
import { couponReducer } from "./CouponState";
import { customerReducer } from "./CustomerState";

const reducers = combineReducers({couponState : couponReducer, companyState : companyReducer, customerState : customerReducer, authState : authReducer});
const store = createStore(reducers);

export default store;