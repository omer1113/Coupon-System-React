import UserModel from "../Models/UserModel/UserModel";

export class AuthState{
    public user:UserModel = null;
    public isLogged:boolean = false;
}

export enum AuthActionType{
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
}

export interface AuthAction{
    type:AuthActionType,
    payload?: any
}

export function loginAction(user:UserModel):AuthAction{
    return {type:AuthActionType.Login, payload:user}
}
export function logoutAction():AuthAction{
    return {type: AuthActionType.Logout}
}

export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction):AuthState{
    const newState = {...currentState};
    switch(action.type){
        case AuthActionType.Login:
            localStorage.removeItem("user");
            newState.user = action.payload;
            localStorage.setItem("user",JSON.stringify(newState.user));
            newState.isLogged = true;
            break;
        case AuthActionType.Logout:
            newState.user = null;
            localStorage.removeItem("user");
            newState.isLogged = false;
            break;
    }
    return newState;
}
