import Company from "../Models/BeanModel/Company";

export class CompanyState{
    public companies : Company[] = [];
}

export enum CompanyActionType{
    CompanyDownload = "CompanyDownload",
    CompanyAdd = "CompanyAdd",
    CompanyUpdate = "CompanyUpdate",
    CompanyDelete = "CompanyDelete"
}

export interface CompanyAction{
    type : CompanyActionType;
    payload? : any;
}

export function companyDownloadAction(companies: Company[]):CompanyAction{
    return {type: CompanyActionType.CompanyDownload, payload:companies}
}

export function companyAddAction(company: Company):CompanyAction{
    return {type: CompanyActionType.CompanyAdd, payload:company}
}

export function companyUpdateAction(company: Company):CompanyAction{
    return {type: CompanyActionType.CompanyUpdate, payload:company}
}

export function companyDeleteAction(company:Company):CompanyAction{
    return {type: CompanyActionType.CompanyDelete, payload:company}
}

export function companyReducer(currentState: CompanyState = new CompanyState, action:CompanyAction):CompanyState{
    const newState = {...currentState};

    switch(action.type){
        case CompanyActionType.CompanyDownload:
            newState.companies = action.payload;
            break;
        case CompanyActionType.CompanyAdd:
            newState.companies.push(action.payload);
            break;
        case CompanyActionType.CompanyUpdate:
            const index = newState.companies.findIndex(item => item.id === action.payload.id);
            newState.companies.splice(index, 1, action.payload);
            break;
        case CompanyActionType.CompanyDelete:
            const deleteIndex = newState.companies.findIndex(item => item.id === action.payload.id);
            newState.companies.splice(deleteIndex,1);
            break;
    }
    return newState;
}