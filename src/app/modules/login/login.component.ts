import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/login.service';
import { LoggingData } from 'src/app/model/loggingData';
import { UserData } from 'src/app/model/userData';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/modules/service/AuthService.component';
import { Router } from '@angular/router';
import { TransferService } from 'src/app/shared/transfer.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public currentUser: UserData;
  public authService:AuthService;
  public headers:any;
  public userIsPresent:boolean;
  public appService: AppService;
  
  //localStorage.getItem("isLoggedIn") === "true"
  constructor(private loginService:LoginService, private router:Router, public transferService:TransferService) { 
    
    console.log("top login constructor");
    this.authService = new AuthService();
    this.userIsPresent=this.authService.getIsLogged();
    this.currentUser=this.authService.getCurrentUser();
    console.log("bottom login constructor");
  }
  validateEmail(email:any) {
    return true;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public onLogin(dataUI:LoggingData){
    
    console.log("top onLogin");
    if(true){
      console.log("username = ",dataUI.username);
      console.log("password = ",dataUI.password);
      this.loginService.tryLogging(dataUI,this.headers).subscribe(
        (response:any)=>{
          if(response['message']=='SUCCESSFULLY LOGGED IN'){
            console.log("response message is ",response['message']);
            this.setUserDetails(response);
          }
          else{
            alert("Please check you email ID and password onece again");
          }
        }
      )
      this.router.navigate(["/login"]);
    }
    else{alert("Please insert correct Email Id");}
  }

  setUserDetails(response){
    console.log("top setUserDetails");

    this.currentUser=new UserData();
    this.appService=new AppService();
    this.authService=new AuthService();
    this.currentUser.username = response['username'];
    this.currentUser.token = response['token'];
    this.currentUser.email = response['email'];
    this.currentUser.roles = response['roles'];
    this.currentUser.id = response['id'];
    this.currentUser.type = response['type'];
    this.currentUser.message = response['message'];

    this.appService.setHttpHeader(this.currentUser.token);
    this.appService.setCurrentUser(this.currentUser);
    
    console.log("bottom setUserDetails");
    
    this.authService.setCurrentUser(this.currentUser);
    this.authService.setToken(this.currentUser.token);
    this.authService.setIsLogged(true);
    this.userIsPresent = JSON.parse(localStorage.getItem('loggedIn'));

    this.transferService.refreshNgOnit();
  }
  

  ngOnInit() {
    
    console.log("top ngOnInit");
    this.appService=new AppService();
    this.headers = this.appService.getHttpHeader(); //this.myList.filter=""; this.myList.data.length=0;
    console.log("bottom ngOnInit");
  }

  refreshLoggedIn(){
    if(localStorage.getItem("loggedIn")=="true"){
      this.userIsPresent = true;
    }
    else{
      this.userIsPresent = false;
    }
  }

}