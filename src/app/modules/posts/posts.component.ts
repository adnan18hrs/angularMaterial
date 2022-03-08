import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { UserData } from 'src/app/model/userData';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public appService : AppService;
  public currentUserData: UserData;
  public halla:string;
  constructor() { 
    this.appService = new AppService();
    this.currentUserData=this.appService.getCurrentUser();
    this.halla=this.currentUserData.email;
  }

  ngOnInit() {
  }

}
