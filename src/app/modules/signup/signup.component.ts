import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupData } from 'src/app/model/SignupData';
//import { refreshing2 } from 'src/app/shared/refreshing2';
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
  constructor(public signupservice:SignupService, public router:Router, public transferService:TransferService/*, public refresh2:refreshing2*/) { }

  public onSignup(dataUI:SignupData){
    //console.log("this.selectedValue = ",this.selectedValue);
    //console.log("dataUI.username = ",dataUI.username);
    dataUI.roles = [dataUI.role];
    dataUI.email = dataUI.username;
    console.log("dataUI.roles = ",dataUI.roles.toString());
    if(dataUI.password==dataUI.repassword){
      console.log("username = ",dataUI.username);
      this.signupservice.trySignup(dataUI,this.headers).subscribe(
        (response:any)=>{
          console.log("RESPONSE is coming");
          console.log("response['message'] = ",response['message']);
          if(response['message']=="User registered successfully!"){
            console.log("user saved inside mongoDB");
            this.setUserDetails(response);
            console.log("response is ",response);
          }
          else{
            alert("not registered successfully");
            
          }
        }
      )
    }
    else{alert("password is not matching");}
    //this.refresh2.refreshing();
    //this.router.navigate(["/login"]);
  }

  setUserDetails(response){
    
    console.log("saving details inside localstorage");
    localStorage.setItem('loggedIn', 'true');
    console.log("JSON.stringify(response) = ",JSON.stringify(response));
    localStorage.setItem('currentUser',JSON.stringify(response));
    console.log("response['token'] = ",response['token']);
    localStorage.setItem('refreshtoken',response['token']);
    //this.transferService.refreshNgOnit();
  }
  
  ngOnInit() {}
}