import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { YoutubeRepository } from 'src/app/service/youtube-repository';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  public product:Product;
  public cart:Product[]=[];
  public carts:Product[]=[];
  public cartSize:boolean=false;
  public flag:boolean=false;
  public products:boolean=false;
  public loading:boolean=false;
  public error:boolean=false;
  public orderItem:number;
  public mySelect=1;
  constructor(public youtubeRepo:YoutubeRepository) {}
  
  counter() {
    return new Array(this.product.countInStock);
  }
  ngOnInit() {
    this.product = JSON.parse(localStorage.getItem('currentProduct'));
  }
  selectChange(){
    console.log("this.mySelect selectChange= ", this.mySelect);
  }

  addToCart(event, obj:Product, force=false){
    console.log("force = ", force);
    console.log("orderItem = ", this.orderItem);
    if(!force){
      obj.inCart=Number(this.mySelect);
    }
    //localStorage.removeItem("currentCart");
    if(this.checkCartSize()){
      console.log("cart is not empty");
      
      this.cart=[];
      this.cart = JSON.parse(localStorage.getItem("currentCart"));
      this.flag=false;
      this.cart.forEach((element,index)=>{
        if(element._id==obj._id&&element.inCart!=obj.inCart){
          this.flag=true;
          this.cart[index]=obj;
        }
        if(element._id==obj._id&&element.inCart==obj.inCart){
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
    this.addToCartReducer(obj, force);
  }

  addToCartReducer(obj:Product, force:boolean){
    this.carts.push(obj);
    
    console.log("calling addtocart inside home ts file");
    const observer$ = this.youtubeRepo.addToReducerCart(this.carts, force);
    const loading$ = observer$[0];
    const product$ = observer$[1];
    const error$ = observer$[2];
    const loaded$ = observer$[3];
    loading$.subscribe((data)=>{
      this.loading = data;
    });
    error$.subscribe((data)=>{
      this.error = data;
    });
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
