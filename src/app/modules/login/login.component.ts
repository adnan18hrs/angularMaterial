import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/login.service';
import { LoggingData } from 'src/app/model/loggingData';
import { UserData } from 'src/app/model/userData';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userData=new UserData();
  headers:any;
  public appService = new AppService();
  constructor(private loginService:LoginService) { }
  validateEmail(email:any) {
    return true;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public onLogin(dataUI:LoggingData){
    if(true){
      console.log("username = ",dataUI.username);
      console.log("password = ",dataUI.password);
      this.loginService.tryLogging(dataUI,this.headers).subscribe(
        (response:any)=>{
          this.appService.setUserDetails(response);
          //console.log("user from backend is ",this.userData.username);
          console.log("response is ",response);
            //alert(response.message);
        }
      )
    }
    else{alert("Please insert correct Email Id");}
  }
  

  ngOnInit() {
    this.headers = this.loginService.getHttpHeader(); //this.myList.filter=""; this.myList.data.length=0;
  }

}