import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/login.service';
import { LoggingData } from 'src/app/model/loggingData';
import { UserData } from 'src/app/model/userData';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/modules/service/AuthService.component';
import { Router } from '@angular/router';
import { TransferService } from 'src/app/shared/transfer.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { combineLatest, Observable } from 'rxjs';
import { getUserError, getUserLoaded, getUserLoading, getUserLogout, getUsers, RootReducerState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UserListErrorAction, UserListRequestAction, UserListSuccessAction } from 'src/app/actions/user-action';
import { SignupData } from 'src/app/model/SignupData';
import { SignupService } from '../signup.service';

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
  public loading:boolean;
  public error:boolean;
  public updation:boolean=false;
  public appService: AppService;
  public dataFromSignup:UserData;
  
  //localStorage.getItem("isLoggedIn") === "true"
  constructor(private loginService:LoginService, private router:Router, public transferService:TransferService, private store:Store<RootReducerState> , 
    public signupservice:SignupService) { 
    
    console.log("top login constructor");
    this.authService = new AuthService();
    this.userIsPresent=this.authService.getIsLogged();
    this.currentUser=this.authService.getCurrentUser();
    console.log("bottom login constructor");
  }
  ngOnInit() {
    
    const logout$ = this.store.select(getUserLogout);
    logout$.subscribe(data=>{
      if(data==true){
        this.userIsPresent = false;
      }
    });
    this.userIsPresent=JSON.parse(localStorage.getItem('loggedIn'));
    console.log("this.userIsPresent inside login ts file = ",JSON.parse(localStorage.getItem('loggedIn')));
    console.log("top ngOnInit");
    this.appService=new AppService();
    this.headers = this.appService.getHttpHeader(); //this.myList.filter=""; this.myList.data.length=0;
    console.log("bottom ngOnInit");
    
    
  }
  validateEmail(email:any) {
    return true;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  public onLogin(dataUI:LoggingData){
    console.log("logging is started");
    const observer$ = this.getLoginData(dataUI);
    const loading$ = observer$[0];
    const user$ = observer$[1];
    const error$ = observer$[2];
    const loaded$ = observer$[3];
    user$.subscribe((data)=>{
      this.currentUser = data;
      //console.log(data);
    });
    loading$.subscribe((data)=>{
      this.loading = data;
    });
    error$.subscribe((data)=>{
      this.error = data;
    });
  }
  
  getLoginData(dataUI:LoggingData, force=false) : [Observable<boolean>, Observable<UserData>, Observable<boolean>, Observable<boolean>] {

    console.log("username = ",dataUI.username);
    console.log("password = ",dataUI.password);

    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUsrData$ = this.store.select(getUsers);
    const error$ = this.store.select(getUserError);
    
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((value)=>{
        //it means reducer is empty
        if((!value[0] && !value[1])||(force)){
          // 1. dispatching an action (from here it will go inside index.ts on reducer)
          this.store.dispatch(new UserListRequestAction());
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
            }, error=>{
              this.store.dispatch(new UserListErrorAction());
            }
          );
          //this.router.navigate(["/login"]);
        }
    });
    return [loading$, getUsrData$, error$, loaded$];
  }

  public updateProfile(dataUI:SignupData){
    dataUI.email = dataUI.username;
    if(dataUI.password==dataUI.repassword){
      this.signupservice.tryUpdating(dataUI,this.headers).subscribe(
        (response:any)=>{
          if(response['message']=="Successfully updated user data"){
            this.updation=true;
            this.setUserDetails(response);
            //this.store.dispatch(new UserListErrorAction());
            console.log("response is ",response);
            this.assignUserInReducer(response);
          }
          else{
            alert("not registered successfully");
          }
        }
      )
    }
    else if(dataUI.password!=dataUI.repassword){alert("password is not matching");}
    if(this.currentUser.message=='Successfully updated user data'){alert('UPDATED')}
  }
  
  assignUserInReducer(response:any){
    //const data= response;
    this.dataFromSignup = new UserData();
    this.dataFromSignup.email = response['email'];
    this.dataFromSignup.token = response['token'];
    this.dataFromSignup.username = response['username'];
    const data=this.dataFromSignup;
    console.log("data[0].username = ", this.dataFromSignup.email);
    this.store.dispatch(new UserListSuccessAction({data}));
 }
  
  setUserDetails(response){
    console.log("top setUserDetails");

    this.currentUser=new UserData();
    this.appService=new AppService();
    this.authService=new AuthService();
    this.currentUser.name = response['name'];
    this.currentUser.username = response['username'];
    this.currentUser.token = response['token'];
    if(this.updation){
      this.currentUser.token = this.authService.getToken();
    }
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

    
    console.log("calling successful action");
    const data= this.currentUser;
    //this.currentUser;
    console.log("data[0].username = ", data.username);
    this.store.dispatch(new UserListSuccessAction({data}));
    //this.transferService.refreshNgOnit();
  }
}