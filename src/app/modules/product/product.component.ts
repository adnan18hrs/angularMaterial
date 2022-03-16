import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  public product:Product;
  public flag:boolean=true;
  public cart:Product[]=[];
  constructor() { }
  
  counter() {
    return new Array(this.product.countInStock);
  }
  ngOnInit() {
    this.product = JSON.parse(localStorage.getItem('currentProduct'));
  }
  
  onCart(event, obj:Product){
    //localStorage.removeItem("currentCart");
    if(JSON.parse(localStorage.getItem("currentCart"))!=null){
      console.log("cart is not empty");
      
      this.cart=[];
      this.cart = JSON.parse(localStorage.getItem("currentCart"));
      this.cart.push(obj);
      localStorage.setItem("currentCart", JSON.stringify(this.cart));
      console.log("cart is =  ",JSON.parse(localStorage.getItem("currentCart")));
    }
    else{
      console.log("cart is empty");
      this.cart=[];
      this.cart.push(obj);
      localStorage.setItem("currentCart", JSON.stringify(this.cart));
      console.log("cart is =  ",JSON.parse(localStorage.getItem("currentCart")));
    }
    console.log("all currentCart = ",JSON.parse(localStorage.getItem("currentCart")));
    this.flag=false;
    //this.router.navigate(["/product/x"]);
  }
}
