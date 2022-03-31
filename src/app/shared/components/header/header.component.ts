import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from 'src/app/modules/service/AuthService.component';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { LoginService } from 'src/app/modules/login.service';
import { getUserLoaded, getUserLogout, RootReducerState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { UserListLogoutAction, UserListSuccessAction } from 'src/app/actions/user-action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  public userIsPresent:boolean;
  public loginOrNot:boolean=false;
  public authService:AuthService;

  
  constructor(private router:Router, public loginService:LoginService, private store:Store<RootReducerState>) {
    //this.userIsPresent = localStorage.getItem('loggedIn');
    this.userIsPresent = JSON.parse(localStorage.getItem('loggedIn'));
   }

  public getScreenWidth: any;
  public getScreenHeight: any;
  public widthIs:boolean;
  public widthIsForDropdown:boolean;
  
  ngOnInit() {
    console.log("inside ngOnit");
    this.userIsPresent = JSON.parse(localStorage.getItem('loggedIn'));
    console.log("userIsPresent = ",this.userIsPresent);
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    //checking login or not
    const loaded$ = this.store.select(getUserLoaded);
    loaded$.subscribe(data=>{
      if(data==true){
        this.userIsPresent = data;
      }
    });
  }

  logout(){
    console.log("logging out");
    this.authService = new AuthService();
    this.authService.clearCurrntUser();
    this.authService.clearCurrntUser();
    this.authService.clearLoggedIn();
    this.authService.clearLoggedIn();
    this.router.navigate(["/login"]);
    this.store.dispatch(new UserListLogoutAction());
    const logout$ = this.store.select(getUserLogout);
    logout$.subscribe(data=>{
      if(data==true){
        this.userIsPresent = false;
      }
    });
    this.userIsPresent=JSON.parse(localStorage.getItem('loggedIn'));
    console.log("this.userIsPresent = ",JSON.parse(localStorage.getItem('loggedIn')));
    
    //this.loginService.refreshNgOnit();
    //this.userIsPresent = JSON.parse(localStorage.getItem('loggedIn'));
  }

  runNgOnit(){
    console.log("inside header component");
    this.ngOnInit();
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

  /*refreshing(){
    console.log("inside header.component.ts to refresh userIsPresent");
    this.userIsPresent = localStorage.getItem('isLoggedIn');
  }*/

}

