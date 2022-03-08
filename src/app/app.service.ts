import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from 'src/app/model/userData';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _localStorage:Storage;
  private currentUser:UserData;
  headers = new HttpHeaders();

  public setHttpHeader(token){
    console.log("inside setHttpHeader");
    this.headers = this.headers.append('Authorization', 'Bearer '+token);
    this.headers = this.headers.append('Content-Type', 'application/json');
    //const jsonData = JSON.stringify(response)
    //this._localStorage.setItem('myData', jsonData);
    //console.log("loalstorag = ",this._localStorage.getItem('myData'));
  }
  
  public setCurrentUser(currentUser:UserData){
    this.currentUser = currentUser;
  }
  public getCurrentUser(){
    return this.currentUser;
  }
  getHttpHeader(){ console.log("Getting HTTP headers"); return this.headers; }
  
  constructor() { }
}
