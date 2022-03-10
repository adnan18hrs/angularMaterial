import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupData } from '../model/SignupData';SignupData

const baseSignUpUrl = 'http://localhost:8080/api/auth/signup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  public trySignup(signupData:SignupData,headers:any): Observable<any>{
    // can be used param = JSON.stringify(loggingData)
    console.log("loggingData.username = ", signupData.username);
    return this.http.post<any>(baseSignUpUrl, signupData, {headers:headers});
  }
}
