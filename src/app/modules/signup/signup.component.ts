import { Component, OnInit } from '@angular/core';
import { SignupData } from 'src/app/model/SignupData';
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
  constructor(public signupservice:SignupService) { }

  public onSignup(dataUI:SignupData){
    //console.log("this.selectedValue = ",this.selectedValue);
    //console.log("dataUI.username = ",dataUI.username);
    dataUI.roles = [dataUI.role];
    dataUI.email = dataUI.username;
    console.log("dataUI.roles = ",dataUI.roles.toString());
    if(dataUI.password==dataUI.repassword){
      console.log("username = ",dataUI.username);
      console.log("password = ",dataUI.password);
      this.signupservice.trySignup(dataUI,this.headers).subscribe(
        (response:any)=>{
          console.log("response is ",response);
        }
      )
      //this.router.navigate(["/login"]);
    }
    else{alert("password is not matching");}
  }
  ngOnInit() {
  }
}

/*
export class Role
{
  role: string, 
  empoloyeeID: number
}

export class FormComponent implements OnInit {
 name: string;
 empoloyeeID : number;
 empList: Array<string> = [];
 constructor() {

 }

 ngOnInit() {
 }
 onEmpCreate(){
   //console.log(this.name,this.empoloyeeID);
   let customObj = new Custom();
   customObj.name = "something";
   customObj.employeeId = 12; 
   this.empList.push(customObj);
   this.name ="";
   this.empoloyeeID = 0; 
 }
}
*/