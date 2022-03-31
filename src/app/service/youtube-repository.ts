import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { take } from "rxjs/operators";
import { ProductAddAction, ProductDeleteAction, ProductListErrorAction, ProductListRequestAction, ProductListSuccessAction, ProductUpdateAction } from "../actions/product-action";
import { Product } from "../model/product";
import { getError, getProductLoaded, getProductLoading, getProducts, RootReducerState } from "../reducers";
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
      
      combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data1)=>{
          //it means reducer is empty
          if((!data1[0] && !data1[1])||(force)){
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