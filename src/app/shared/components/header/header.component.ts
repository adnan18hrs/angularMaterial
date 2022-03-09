import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from 'src/app/modules/service/AuthService.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  public userIsPresent:string;
  public authService:AuthService;
  
  constructor(private router:Router) {
    //this.userIsPresent = localStorage.getItem('loggedIn');
    this.userIsPresent = JSON.parse(localStorage.getItem('loggedIn'));
   }

  public getScreenWidth: any;
  public getScreenHeight: any;
  public widthIs:boolean;
  public widthIsForDropdown:boolean;
  
  ngOnInit() {
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
  }
  logout(){
    console.log("logging out");
    this.authService = new AuthService();
    this.authService.clearCurrntUser();
    this.authService.clearLoggedIn();
    this.authService.clearLoggedIn();
    this.router.navigate(["/login"]);
    this.userIsPresent = JSON.parse(localStorage.getItem('loggedIn'));
    
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.getScreenWidth<600){
      this.widthIs=true;
    }
    else{
      this.widthIs=false;
    }
    if (this.getScreenWidth<990){
      this.widthIsForDropdown=true;
    }
    else{
      this.widthIsForDropdown=false;
    }
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}

