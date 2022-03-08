import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/login.service';
import { LoggingData } from 'src/app/model/loggingData';
import { UserData } from 'src/app/model/userData';
import { AppService } from 'src/app/app.service';
import { UpdateService } from 'src/app/modules/service/UpdateService.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public currentUser: UserData;
  public updateService:UpdateService;
  headers:any;
  public userIsPresent:boolean;
  private appService: AppService;
  //localStorage.getItem("isLoggedIn") === "true"
  constructor(private loginService:LoginService) { 
    this.updateService = new UpdateService();
    this.userIsPresent=this.updateService.getIsLogged();
  
  }
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
          this.setUserDetails(response);
          //this.appService.setUserDetails(response);
          //console.log("user from backend is ",this.userData.username);
          console.log("response is ",response);
            //alert(response.message);
        }
      )
    }
    else{alert("Please insert correct Email Id");}
  }
  setUserDetails(response){

    this.currentUser=new UserData();
    this.appService=new AppService();
    this.updateService=new UpdateService();
    this.currentUser.username = response['username'];
    this.currentUser.token = response['token'];
    this.currentUser.email = response['email'];
    this.currentUser.roles = response['roles'];
    this.currentUser.id = response['id'];
    this.currentUser.type = response['type'];
    this.currentUser.message = response['message'];
    console.log("calling setHttpHeaders");
    this.appService.setHttpHeader(this.currentUser.token);
    this.appService.setCurrentUser(this.currentUser);
    //window.localStorage.setItem('userIsPresent', 'true');

    this.updateService.setIsLogged(true);

    //this.userIsPresent = true;
    
    //this.localStorage.setItem('loginOrNot','true');
  }
  

  ngOnInit() {
    this.appService=new AppService();
    this.headers = this.appService.getHttpHeader(); //this.myList.filter=""; this.myList.data.length=0;
  }

  

}