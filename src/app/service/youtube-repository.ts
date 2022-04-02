import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { take } from "rxjs/operators";
import { CartDeleteAction, CartListIncreaseCount, CartListAddingAction, CartUpdateAction } from "../actions/cart-action";
import { ProductAddAction, ProductDeleteAction, ProductListErrorAction, ProductListRequestAction, ProductListSuccessAction, ProductUpdateAction } from "../actions/product-action";
import { Product } from "../model/product";
import { getCartError, getCartLoaded, getCartLoading, getCarts, getError, getProductLoaded, getProductLoading, getProducts, RootReducerState } from "../reducers";
import { ApiService } from "./app.service";

@Injectable()
export class YoutubeRepository{
  public products:Product[];
  constructor(private store:Store<RootReducerState>, private apiService:ApiService){
  }

  getProductList(force=false) : [Observable<boolean>, Observable<Product[]>, Observable<boolean>, Observable<boolean>] {
      const loading$ = this.store.select(getProductLoading);
      const loaded$ = this.store.select(getProductLoaded);
      const getProductData$ = this.store.select(getProducts);
      const error$ = this.store.select(getError);
      
      combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((condition)=>{
          //it means reducer is empty
          if((!condition[0] && !condition[1])||(force)){
            // 1. dispatching an action (from here it will go inside index.ts on reducer)
            this.store.dispatch(new ProductListRequestAction());
            this.apiService.getAllPost().subscribe(data=>{
              this.store.dispatch(new ProductListSuccessAction({data}));
            }, error=>{
                this.store.dispatch(new ProductListErrorAction());
            }
            );
          }
      });
      return [loading$, getProductData$, error$, loaded$];
  }
  addToReducerCart(data:Product[], force:boolean) : [Observable<boolean>, Observable<Product[]>, Observable<boolean>, Observable<boolean>] {
    
    const loading$ = this.store.select(getCartLoading);
    const loaded$ = this.store.select(getCartLoaded);
    const getCartData$ = this.store.select(getCarts);
    const error$ = this.store.select(getCartError);
    
    console.log("calling function of action from youtube-repo.ts");
    const cnt = JSON.parse(localStorage.getItem("currentCart")).length;

    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((condition)=>{
      if(!force){
        this.store.dispatch(new CartListIncreaseCount({cnt}));
        this.store.dispatch(new CartListAddingAction({data}));
      }
      else{
        this.store.dispatch(new CartUpdateAction({data}));
      }
    });
    return [loading$, getCartData$, error$, loaded$];
  }
  deleteFromCart(obj:Product){
    const data=obj;
    this.store.dispatch(new CartDeleteAction({data}));
    const cnt = JSON.parse(localStorage.getItem("currentCart")).length;
    this.store.dispatch(new CartListIncreaseCount({cnt}));
  }

  userDelete(id:number){
    this.store.dispatch(new ProductDeleteAction({id}));
  }
  userUpdate(data:Product){
    this.store.dispatch(new ProductUpdateAction({data}));
  }
  addUser(data:Product){
    //first call API to add User and then update it in store
    this.store.dispatch(new ProductAddAction({data}));
  }
}