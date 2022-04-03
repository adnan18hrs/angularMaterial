import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/address';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  public shippingAddress:Address;
  constructor() { }
  ngOnInit() {
    this.shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
    console.log("shippingAddress.address = ", this.shippingAddress.address);
  }
  public onSignup(myForm:NgForm){
    console.log("address.address = ",myForm.value);
    localStorage.setItem('shippingAddress',JSON.stringify(myForm.value));
  }

}
