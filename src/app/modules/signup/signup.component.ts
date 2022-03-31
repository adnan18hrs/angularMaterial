import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserListSuccessAction } from 'src/app/actions/user-action';
import { SignupData } from 'src/app/model/SignupData';
import { UserData } from 'src/app/model/userData';
import { RootReducerState } from 'src/app/reducers';
import { TransferService } from 'src/app/shared/transfer.service';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public headers:any;
  roles = [
    {sign: "admin", name: "ADMIN"},
    {sign: "user", name: "USER"},
    {sign: "mod", name: "MOD"}
  ];
  selectedValue:string;
  public dataFromSignup:UserData;
  constructor(public signupservice:SignupService, public router:Router, private store:Store<RootReducerState>) { }

  public onSignup(dataUI:SignupData){
    //console.log("this.selectedValue = ",this.selectedValue);
    //console.log("dataUI.username = ",dataUI.username);
    //dataUI.roles = [dataUI.role];
    dataUI.email = dataUI.username;
    //console.log("dataUI.roles = ",dataUI.roles.toString());
    if(dataUI.password==dataUI.repassword){
      console.log("username = ",dataUI.username);
      this.signupservice.trySignup(dataUI,this.headers).subscribe(
        (response:any)=>{
          console.log("response['message'] = ",response['message']);
          if(response['message']=="User registered successfully!"){
            this.setUserDetails(response);
            console.log("response is ",response);
            this.assignUserInReducer(response);
          }
          else{
            alert("not registered successfully");
          }
        }
      )
    }
    else{alert("password is not matching");}
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
    
    console.log("saving details inside localstorage");
    localStorage.setItem('loggedIn', 'true');
    console.log("JSON.stringify(response) = ",JSON.stringify(response));
    localStorage.setItem('currentUser',JSON.stringify(response));
    console.log("response['token'] = ",response['token']);
    localStorage.setItem('refreshtoken',response['token']);
    this.router.navigate(["/login"]);
  }
  
  ngOnInit() {}
}