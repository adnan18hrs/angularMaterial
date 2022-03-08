import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { BehaviorSubject } from 'rxjs';
import { UserData } from "src/app/model/userData";


@Injectable()
export class UpdateService{
    private user = new Subject<UserData>();
    public isLogged = new BehaviorSubject<boolean>(null);

    public userIsPresent = JSON.parse(localStorage.getItem('loggedIn') || 'false');

    isLogged$ = this.isLogged.asObservable();
    user$ = this.user.asObservable();

    setIsLogged(isLogged:boolean){
        this.userIsPresent=isLogged;
        localStorage.setItem('loggedIn', 'true');
        //this.isLogged.next(isLogged);
    }
    getIsLogged(){
        return JSON.parse(localStorage.getItem('loggedIn') || this.userIsPresent.toString());
    }


    setCurrentUser(user:UserData){
        this.user.next(user);
    }
}