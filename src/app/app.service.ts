import { Injectable } from '@angular/core';
import { UserData } from 'src/app/model/userData';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _localStorage:Storage;

  userData:UserData;
  public setUserDetails(response:any){
    //const jsonData = JSON.stringify(response)
    //console.log("jsonData = ",jsonData);
    //this._localStorage.setItem('myData', jsonData);
    //console.log("loalstorag = ",this._localStorage.getItem('myData'));
    let userData1 = new UserData();
    userData1.username = response['username'];
    userData1.token = response['token'];
    userData1.email = response['email'];
    userData1.roles = response['roles'];
    userData1.id = response['id'];
    userData1.type = response['type'];
    userData1.message = response['message'];
    this.userData=userData1;
    console.log("from app service useer is = ",this.userData.username);
  }
  public getUserDetails(){
    return this.userData;
  }
  constructor() { }
}
