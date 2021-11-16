import Coupon from "../Models/BeanModel/Coupon";

export class CouponState{
    public coupons : Coupon[] = [];
}

export enum CouponActionType{
    CouponDownload = "CouponDownload",
    CouponAdd = "CouponAdd",
    CouponUpdate = "CouponUpdate",
    CouponDelete = "CouponDelete"
}

export interface CouponAction{
    type : CouponActionType;
    payload? : any;
}

export function couponDownloadAction(coupons: Coupon[]):CouponAction{
    return {type: CouponActionType.CouponDownload, payload:coupons}
}

export function couponAddAction(coupon: Coupon):CouponAction{
    return {type: CouponActionType.CouponAdd, payload:coupon}
}

export function couponUpdateAction(coupon: Coupon):CouponAction{
    return {type: CouponActionType.CouponUpdate, payload:coupon}
}

export function couponDeleteAction(coupon:Coupon):CouponAction{
    return {type: CouponActionType.CouponDelete, payload:coupon}
}

export function couponReducer(currentState: CouponState = new CouponState, action:CouponAction):CouponState{
    const newState = {...currentState};

    switch(action.type){
        case CouponActionType.CouponAdd:
            newState.coupons.push(action.payload);
            break;
        case CouponActionType.CouponUpdate:
            const index = newState.coupons.findIndex(item => item.id === action.payload.id);
            newState.coupons.splice(index, 1, action.payload);
            break;
        case CouponActionType.CouponDelete:
            const deleteIndex = newState.coupons.findIndex(item => item.id === action.payload.id);
            newState.coupons.splice(deleteIndex,1);
            break;
    }
    return newState;
}