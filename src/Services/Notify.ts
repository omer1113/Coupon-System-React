import {Notyf} from "notyf";

class Notify{
    private notification = new Notyf({duration: 2_000, position:{x: "center" ,y:"bottom"}});

    public success(message:string){
        this.notification.success(message)
    }

    public error(message:string){
        this.notification.error(message)
    }

    private extractMessage(err:any):string{
        if (typeof err === "string"){
            return err;
        }
        if (typeof err?.response?.data === "string"){
            return err.response.data[0];
        }
        if (Array.isArray(err?.response?.data)){
            return err.response.data[0];
        }
        //must be last
        if (typeof err?.message === "string"){
            return err.message;
        }
        return "error";
    }
}

const notify = new Notify();

export default notify;