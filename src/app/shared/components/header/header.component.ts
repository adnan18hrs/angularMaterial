import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public getScreenWidth: any;
  public getScreenHeight: any;
  public widthIs:boolean;
  public widthIsForDropdown:boolean;
  
  ngOnInit() {
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
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

