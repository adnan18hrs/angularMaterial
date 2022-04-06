import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { stringify } from 'querystring';
import { CartListIncreaseCount, CartListAddingAction } from 'src/app/actions/cart-action';
import { Product } from 'src/app/model/product';
import { getCartLoading, getCount, getTotalPrice, RootReducerState } from 'src/app/reducers';
import { YoutubeRepository } from 'src/app/service/youtube-repository';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  animalControl = new FormControl('');



  public cartItems:Product[]=[];
  public cartTemp1:Product[]=[];
  public cartTemp2:Product[]=[];
  public cartSize:boolean;
  public flag:boolean;
  public loading:boolean;
  public error:boolean;
  public itemsCount:number;
  public totalPrice:number;
  public changing:boolean=false;
  public alwaysTrue:boolean=true;
  public cartTemp:Product[]=[];
  public mySelect:number=1;
  
  constructor(private store:Store<RootReducerState>, public youtubeRepo:YoutubeRepository, public productComponent:ProductComponent) { }

  ngOnInit() {
    
    if(JSON.parse(localStorage.getItem("currentCart"))!=null){
      console.log("cart is not empty...........");
      this.cartItems = JSON.parse(localStorage.getItem("currentCart"));
      console.log("cartItems = ",this.cartItems);
      this.checkCartSize();
    }
    const count$ = this.store.select(getCount);
    count$.subscribe(data=>{
      this.itemsCount=data;
    });
    const getTotalPrice$ = this.store.select(getTotalPrice);
    getTotalPrice$.subscribe(data=>{
      this.totalPrice=data;
    });

    this.cartTemp=[];
    this.totalPrice=0;
    this.cartTemp = JSON.parse(localStorage.getItem("currentCart"));
    this.cartTemp.forEach((element,index)=>{
      this.totalPrice = this.totalPrice + (element.price*element.inCart);
    });    
    this.itemsCount = JSON.parse(localStorage.getItem("currentCart")).length;
  }
  makingSelectEqualToInCart(x:number){
    console.log("makingSelectEqualToInCart = ", x);
    this.mySelect = x;
  }


  onChanging(event, x:number, product:Product){
    console.log("x = ", x);
    console.log("product.idcart = ", product.inCart);
    this.mySelect=x;
    this.changing=true;
    if(x!=product.inCart){
      console.log("inCart before = ", product.inCart);
      product.inCart=this.mySelect;
      console.log("inCart after = ", product.inCart);
      this.productComponent.addToCart(event, product, true);
    }
  }


  counter(x:number) {
    return new Array(x);
  }
  
  onDelete(event, obj:Product){
    console.log("hello");
    this.cartItems=[];
    this.cartTemp1 = JSON.parse(localStorage.getItem("currentCart"));
    //console.log("size of cart is = ",this.cartTemp1.length);
    this.cartTemp1.forEach((element,index)=>{
      if(element._id!=obj._id){
        this.cartItems.push(element);
      }
    });
    localStorage.setItem("currentCart", JSON.stringify(this.cartItems));
    this.checkCartSize();
    this.deleteFromReducer(obj);
  }
  onProduct(event, obj:Product){
    localStorage.setItem('currentProduct',JSON.stringify(obj));
    //this.router.navigate(["/product/x"]);
  }
  checkCartSize(){
    if(JSON.parse(localStorage.getItem("currentCart")).length>0){
      this.cartSize=true;
    }
    else{this.cartSize=false;}
  }
  deleteFromReducer(obj:Product){
    const observer$ = this.youtubeRepo.deleteFromCart(obj);
  }
  
}
