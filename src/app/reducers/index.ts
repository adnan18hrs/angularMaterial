import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromProduct from "./product-reducer";
import * as fromUser from "./user-reducer";

//state of all reducer mentioned here
export interface RootReducerState{
    products:fromProduct.ProductReducerState;
    users:fromUser.UserReducerState;
}

//all reducer combined here (this is master reducer)
// 2. all the reducers will be checked for that particular
export const rootReducer: ActionReducerMap<RootReducerState>={
    products:fromProduct.ProductReducer,
    users:fromUser.UserReducer
};

export const getProductState = (state:RootReducerState)=> state.products;
export const getProductLoaded = createSelector(getProductState,fromProduct.getLoaded);
export const getProductLoading = createSelector(getProductState,fromProduct.getLoading);
export const getProducts = createSelector(getProductState,fromProduct.getProducts);
export const getError = createSelector(getProductState,fromProduct.getError);


export const getUserState = (state:RootReducerState)=> state.users;
export const getUserLoaded = createSelector(getUserState,fromUser.getLoaded);
export const getUserLoading = createSelector(getUserState,fromUser.getLoading);
export const getUserLogout = createSelector(getUserState,fromUser.getLogout);
export const getUsers = createSelector(getUserState,fromUser.getUsers);
export const getUserError = createSelector(getUserState,fromUser.getError);
