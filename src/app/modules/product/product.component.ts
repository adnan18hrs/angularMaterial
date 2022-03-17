import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  public product:Product;
  public cart:Product[]=[];
  public cartSize:boolean=false;
  public flag:boolean=false;
  
  
  constructor() { }
  
  counter() {
    return new Array(this.product.countInStock);
  }
  ngOnInit() {
    this.product = JSON.parse(localStorage.getItem('currentProduct'));
  }
  
  addToCart(event, obj:Product){
    //localStorage.removeItem("currentCart");
    if(this.checkCartSize()){
      console.log("cart is not empty");
      
      this.cart=[];
      this.cart = JSON.parse(localStorage.getItem("currentCart"));
      this.flag=false;
      this.cart.forEach((element,index)=>{
        if(element._id==obj._id){
          this.flag=true;
        }
      });
      if(!this.flag){
        this.cart.push(obj);
      }
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
    //this.router.navigate(["/product/x"]);
  }


  checkCartSize(){
    if(JSON.parse(localStorage.getItem("currentCart"))!=null&&JSON.parse(localStorage.getItem("currentCart")).length>0){
      this.cartSize=true;
      return true;
    }
    else{this.cartSize=false;return false;}
  }

}
