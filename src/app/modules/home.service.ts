import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoggingData } from '../model/loggingData';

//8000 is default port for Django, this API is for calling backend
const baseUrl = 'http://localhost:8000/api/tutorials';
const baseContactUrl = 'http://localhost:8000/api/saveContact';
const baseBookingUrl = 'http://localhost:8000/api/saveBooking';
const baseCheckLoggingUrl = 'http://localhost:8000/api/checkUser';
const baseLoggingUrl = 'https://adnan-springboot-mongo-swagger.herokuapp.com/api/auth/signin';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  
  headersObj = new HttpHeaders({'Content-Type': 'application/json'});
  getHttpHeader(){ console.log("Getting HTTP headers"); return this.headersObj; }

  constructor(private http: HttpClient) { }

  public getAll(headers:any): Observable<any> {
    console.log("Backend RAW response = ",this.http.get<any>(baseUrl, {headers:headers}));
    return this.http.get<any>(baseUrl, {headers:headers});
  }

  public tryLogging(loggingData:LoggingData,headers:any): Observable<any>{
    // can be used param = JSON.stringify(loggingData)
    console.log("loggingData.username = ", loggingData.username);
    let params = this.createParams3(loggingData);
    console.log("params = ",params);
    return this.http.post<any>(baseLoggingUrl, {params, headers:headers});
  }

  private createParams3(loggingData:LoggingData){
    console.log("inside createParams3 function of service class of home component");
    return new HttpParams({fromObject:{username:loggingData.username,password:loggingData.password}})
  } 
}
