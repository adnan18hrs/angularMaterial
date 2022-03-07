import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoggingData } from '../model/loggingData';

//8000 is default port for Django, this API is for calling backend
const baseUrl = 'http://localhost:8000/api/tutorials';
const baseLoggingUrl = 'http://localhost:8080/api/auth/signin';
const getUserUrl = 'http://localhost:8080/api/user/user';
const getUserByMailID = 'http://localhost:8080/api/user/userByMailId/'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  headersObj = new HttpHeaders({'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG5hbiIsImlhdCI6MTY0NjU0NzIwOSwiZXhwIjoxNjQ2NjMzNjA5fQ._9cVjnbazgs_xJvM0qbEKwfNHxwitWjhUcXUMFpNFNWhj_zpMkHUd545osbNKrPDGHGMWvtdlu5ps6nGCRoDjg','Content-Type': 'application/json'});
  getHttpHeader(){ console.log("Getting HTTP headers"); return this.headersObj; }
  constructor(private http: HttpClient) { }
  
  public getAll(headers:any): Observable<any> {
    console.log("Backend RAW response = ",this.http.get<any>(baseUrl, {headers:headers}));
    return this.http.get<any>(baseUrl, {headers:headers});
  }

  public tryLogging(loggingData:LoggingData,headers:any): Observable<any>{
    // can be used param = JSON.stringify(loggingData)
    console.log("loggingData.username = ", loggingData.username);
    //let params = this.createParams3(loggingData);
    //let mail = 'adnankhan@gmail.com';
    //console.log("params = ",params);
    //return this.http.get<any>(getUserUrl, {headers:headers});
    //return this.http.get<any>(getUserByMailID+mail, {headers:headers});
    return this.http.post<any>(baseLoggingUrl, loggingData, {headers:headers});
  }

  private createParams3(loggingData:LoggingData){
    console.log("inside createParams3 function of service class of home component");
    console.log("username:loggingData.username = ",loggingData.username);
    console.log("password:loggingData.password = ",loggingData.password);
    return new HttpParams({fromObject:{username:loggingData.username,password:loggingData.password}})
  } 
}

  

  