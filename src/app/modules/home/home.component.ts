import { Component, OnInit, Input } from '@angular/core';
import { LoggingData } from 'src/app/model/loggingData';
import { HomeService } from 'src/app/modules/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  headers:any; 
  public popup:boolean;
  constructor(private homeService:HomeService) { }
  data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  validateEmail(email:any) {
    return true;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  public onLogin(dataUI:LoggingData){
    if(true){
      console.log("username = ",dataUI.username);
      console.log("password = ",dataUI.password);
      this.homeService.tryLogging(dataUI,this.headers).subscribe(
        (response:any)=>{
          console.log("response is ",response);
            //alert(response.message);
        }
      )
    }
    else{alert("Please insert correct Email Id");}
  }

  
  ngOnInit() {
    this.headers = this.homeService.getHttpHeader(); //this.myList.filter=""; this.myList.data.length=0;
  }

}
