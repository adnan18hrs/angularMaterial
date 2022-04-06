import { Injectable } from "@angular/core";
import { stringify } from "querystring";
import { Subject } from "rxjs";
import { BehaviorSubject } from 'rxjs';
import { UserData } from "src/app/model/userData";


@Injectable()
export class AuthService{
    //public user = new Subject<UserData>();
    //user$ = this.user.asObservable();
    //public isLogged = new BehaviorSubject<boolean>(null);
    //isLogged$ = this.isLogged.asObservable();
    //public token = new BehaviorSubject<string>(null);
    //token$ = this.token.asObservable();

    public tempUser:UserData;

    //public userIsPresent = JSON.parse(localStorage.getItem('loggedIn') || 'false');
    //public currUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    //public token = JSON.parse(localStorage.getItem('refreshtoken') || 'null');
    
    setIsLogged(isLogged:boolean){
        //console.log("top setIsLogged");
        localStorage.setItem('loggedIn', 'true');
        //console.log("bottom setIsLogged");
        //this.isLogged.next(isLogged);
    }
    getIsLogged(){
        //console.log("top getIsLogged");
        return JSON.parse(localStorage.getItem('loggedIn')/* || this.userIsPresent)*/);
    }
    setCurrentUser(user:UserData){
        
        //console.log("top setCurrentUser");
        //if(!this.userIsPresent){
            //this.currUser=user;
            localStorage.setItem('currentUser',JSON.stringify(user));
            //this.user.next(user);
        //}
    }
    getCurrentUser(){
        //if(this.currUser==null){
            return JSON.parse(localStorage.getItem('currentUser'));
        //}
        //return JSON.parse(localStorage.getItem('currentUser') || this.currUser.toString());
    }
    setToken(token){
        //console.log("top setToken");
        //if(!this.userIsPresent){
            //this.token=token;
            localStorage.setItem('refreshtoken',token);
        //}
    }
    getToken(){
            return localStorage.getItem('refreshtoken');
    }
    clearCurrntUser(){
        //console.log("setting null in current user");
        localStorage.removeItem('currentUser');
        //console.log("current user = ",JSON.parse(localStorage.getItem('currentUser')));
    }
    clearToken(){
        localStorage.removeItem('refreshtoken');
    }
    clearLoggedIn(){
        localStorage.removeItem('loggedIn');
    }
}