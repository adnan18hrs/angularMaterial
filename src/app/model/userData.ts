
export class UserData{

    username:string;
    token:string;
    email:string;
    roles:[];
    id:string;
    type:string;
    message:string;

    isAdmin:boolean;
    isUser:boolean;
    isMod:boolean;

    /*constructor(response) {
        this.username = response['username'];
        this.token = response['token'];
        this.email = response['email'];
        this.roles = response['roles'];
        this.id = response['id'];
        this.type = response['type'];
        this.message = response['message'];
    }*/

    /*getSalary() : number {
        return 10000;
    }*/
}