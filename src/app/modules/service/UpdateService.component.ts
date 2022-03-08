import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { BehaviorSubject } from 'rxjs';
import { UserData } from "src/app/model/userData";


@Injectable()
export class UpdateService{
    private user = new Subject<UserData>();
    public isLogged = new BehaviorSubject<boolean>(null);

    isLogged$ = this.isLogged.asObservable();
    user$ = this.user.asObservable();

    setIsLogged(isLogged:boolean){
        this.isLogged.next(isLogged);
    }

    setCurrentUser(user:UserData){
        this.user.next(user);
    }
}