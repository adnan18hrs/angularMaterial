import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromProduct from "./product-reducer";

//state of all reducer mentioned here
export interface RootReducerState{
    products:fromProduct.ProductReducerState;
}

//all reducer combined here (this is master reducer)
// 2. all the reducers will be checked for that particular
export const rootReducer: ActionReducerMap<RootReducerState>={
    products:fromProduct.ProductReducer
};

export const getProductState = (state:RootReducerState)=> state.products;

export const getProductLoaded = createSelector(getProductState,fromProduct.getLoaded);
export const getProductLoading = createSelector(getProductState,fromProduct.getLoading);
export const getProducts = createSelector(getProductState,fromProduct.getProducts);
export const getError = createSelector(getProductState,fromProduct.getError);
