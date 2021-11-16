import Customer from "../Models/BeanModel/Customer";

export class CustomerState{
    public customers : Customer[] = [];
}

export enum CustomerActionType{
    CustomerDownload ="CustomerDownload",
    CustomerAdd = "CustomerAdd",
    CustomerUpdate = "CustomerUpdate",
    CustomerDelete = "CustomerDelete",
    Register = "Register"
}

export interface CustomerAction{
    type : CustomerActionType;
    payload? : any;
}

export function customerDownloadAction(customers: Customer[]):CustomerAction{
    return {type: CustomerActionType.CustomerDownload, payload:customers}
}
export function customerAddAction(customer: Customer):CustomerAction{
    return {type: CustomerActionType.CustomerAdd, payload:customer}
}

export function customerUpdateAction(customer: Customer):CustomerAction{
    return {type: CustomerActionType.CustomerUpdate, payload:customer}
}

export function customerDeleteAction(customer: Customer):CustomerAction{
    return {type: CustomerActionType.CustomerDelete, payload:customer}
}


export function customerReducer(currentState: CustomerState = new CustomerState, action:CustomerAction):CustomerState{
    const newState = {...currentState};

    switch(action.type){
        case CustomerActionType.CustomerDownload:
            newState.customers =action.payload;
            break;
        case CustomerActionType.CustomerAdd:
            newState.customers.push(action.payload);
            break;
        case CustomerActionType.CustomerUpdate:
            const index = newState.customers.findIndex(item => item.id === action.payload.id);
            newState.customers.splice(index, 1, action.payload);
            break;
        case CustomerActionType.CustomerDelete:
            const deleteIndex = newState.customers.findIndex(item => item.id === action.payload.id);
            newState.customers.splice(deleteIndex,1);
            break;
    }
    return newState;
}