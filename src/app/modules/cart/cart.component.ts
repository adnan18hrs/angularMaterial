import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems:Product[]=[];
  constructor() { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem("currentCart"))!=null){
      console.log("cart is not empty...........");
      this.cartItems = JSON.parse(localStorage.getItem("currentCart"));
      console.log("cartItems = ",this.cartItems);
    }
  }
  counter(x:number) {
    return new Array(x);
  }
}
