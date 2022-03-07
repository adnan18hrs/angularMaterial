import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { UserData } from 'src/app/model/userData';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public appService:AppService;
  //public userData=new UserData();
  //public halla:string;
  constructor() { 
    //this.userData=this.appService.getUserDetails();
    //this.halla=this.userData.username;
  }

  ngOnInit() {
  }

}
