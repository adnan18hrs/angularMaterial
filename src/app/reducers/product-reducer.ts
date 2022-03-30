import { PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_LIST_ERROR, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE } from "src/app/actions/product-action";
import { Action } from "src/app/actions";
import { Product } from "../model/product";

export interface ProductReducerState{
    loading:boolean;
    loaded:boolean;
    error:boolean;
    products:Product[];
}
const initialState:ProductReducerState={
    loaded:false,
    loading:false,
    error:false,
    products:[]
}
// 3. this reducer will be called because "new UserListRequestAction()" action is dispatched from user.component.ts 
export function ProductReducer(state=initialState, action:Action):ProductReducerState{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:{
            return {...state, loading:true};
        }
        case PRODUCT_LIST_SUCCESS:{
            const updatedProducts = state.products.concat(action.payload.data);
            return {...state, loading:false, loaded:true, products:updatedProducts, error:false};
        }
        case PRODUCT_DELETE:{
            const products = state.products.filter(data=>data._id!==action.payload._id);
            return {...state, ...{products}};
        }
        case PRODUCT_ADD:{
            const products = state.products.concat(action.payload.data);
            return {...state, ...{products}};
        }
        case PRODUCT_UPDATE:{
            const products = state.products.filter(data=>data._id!==action.payload.data.id);
            const updateProducts = products.concat(action.payload.data);
            return {...state, ...{products:updateProducts}};
        }
        case PRODUCT_LIST_ERROR:{
            return {...state, error:true, loading:false};
        }
        default:{
            return state;
        }
    }
}
//selectors (used to access the value present inside state, (it is a kind of BehaviralSubject))
export const getLoading = (state:ProductReducerState) => state.loading;
export const getLoaded = (state:ProductReducerState) => state.loaded;
export const getError = (state:ProductReducerState) => state.error;
export const getProducts = (state:ProductReducerState) => state.products;


