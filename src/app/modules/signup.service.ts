import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupData } from '../model/SignupData';SignupData

//const baseSignUpUrl = 'https://adnan-springboot-mongo-swagger.herokuapp.com/api/auth/signup';
//const baseUpdateUrl = 'https://adnan-springboot-mongo-swagger.herokuapp.com/api/user/updateUser';
const baseSignUpUrl = 'http://localhost:8080/api/auth/signup';
const baseUpdateUrl = 'http://localhost:8080/api/user/updateUser';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  public token:string;
  constructor(private http:HttpClient) { }

  public trySignup(signupData:SignupData,headers:any): Observable<any>{
    // can be used param = JSON.stringify(loggingData)
    console.log("loggingData.username = ", signupData.username);
    return this.http.post<any>(baseSignUpUrl, signupData, {headers:headers});
  }
  public tryUpdating(signupData:SignupData,headers:any): Observable<any>{
    this.token=localStorage.getItem('refreshtoken');
    this.token = 'Bearer ' + this.token;
    console.log("this.header = ", this.token);
    headers=headers.append('content-type','application/json');
    headers=headers.append('Authorization',this.token);
    return this.http.post<any>(baseUpdateUrl, signupData, {headers:headers}); 
  }
}
