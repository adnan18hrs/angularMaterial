import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems:Product[]=[];
  public cartTemp1:Product[]=[];
  public cartTemp2:Product[]=[];
  public cartSize:boolean;
  public flag:boolean;
  constructor() { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem("currentCart"))!=null){
      console.log("cart is not empty...........");
      this.cartItems = JSON.parse(localStorage.getItem("currentCart"));
      console.log("cartItems = ",this.cartItems);
      this.checkCartSize();
    }
  }
  counter(x:number) {
    return new Array(x);
  }
  onDelete(event, obj:Product){
    console.log("hello");
    this.cartItems=[];
    this.cartTemp1 = JSON.parse(localStorage.getItem("currentCart"));
    this.cartTemp1.forEach((element,index)=>{
      if(element._id!=obj._id){
        this.cartItems.push(element);
      }
    });
    localStorage.setItem("currentCart", JSON.stringify(this.cartItems));
    this.checkCartSize();
  }
  
  checkCartSize(){
    this.flag=false;
    JSON.parse(localStorage.getItem("currentCart")).forEach((element,index)=>{
      if(element!=null){
        this.flag=true;
      }
    });
    if(this.flag){
      this.cartSize=true;
    }
    else{
      this.cartSize=false;
    }
  }
  getCartSize(){
    this.checkCartSize();
    return this.cartSize;
  }
}
