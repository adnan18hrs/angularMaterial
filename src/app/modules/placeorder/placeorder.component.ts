import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/address';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements OnInit {

  public shippingAddress:Address;
  public cartItems:Product[]=[];
  public allTotal=0;
  constructor() { }
  ngOnInit() {
    this.shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
    this.cartItems = JSON.parse(localStorage.getItem("currentCart"));
    for(var oneItem of this.cartItems){
      this.allTotal=this.allTotal+(oneItem.inCart)*(oneItem.price);
    }
  }

}
