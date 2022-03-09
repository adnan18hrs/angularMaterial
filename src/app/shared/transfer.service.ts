import { Injectable } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(public headerComponent:HeaderComponent) { }
  refreshNgOnit(){
    console.log("inside transfer service");
    //this.headerComponent.runNgOnit();
    window.location.reload();
  }
}
