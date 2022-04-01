import { CART_ADD, CART_DELETE, CART_LIST_ERROR, CART_LIST_COUNT, CART_LIST_ADDING, CART_UPDATE } from "src/app/actions/cart-action";
import { Action } from "src/app/actions";
import { Product } from "../model/product";

export interface CartReducerState{
    loading:boolean;
    loaded:boolean;
    error:boolean;
    count:number;
    totalPrice:number;
    carts:Product[];
}
const initialState:CartReducerState={
    loaded:false,
    loading:false,
    count:0,
    totalPrice:0,
    error:false,
    carts:[]
}
// 3. this reducer will be called because "new UserListRequestAction()" action is dispatched from user.component.ts 
export function CartReducer(state=initialState, action:Action):CartReducerState{
    switch(action.type){
        case CART_LIST_COUNT:{
            console.log("adding new cart count will increase = ",action.payload.cnt);
            const x = action.payload.cnt;
            return {...state, loading:true, ...{count:x}};
        }
        case CART_LIST_ADDING:{
            let xx:Product[]=[];
            xx = JSON.parse(localStorage.getItem("currentCart"));
            const updatedCarts = xx.concat(action.payload.data);
            console.log("initial = ",state.totalPrice);
            let price = 0;
            for(var x of updatedCarts){
                price = price + (x.price)*(x.inCart);
            }
            console.log("totalPrice = ", price); // prints values: 10, 20, 30, 40
            return {...state, loading:false, loaded:true, carts:updatedCarts, error:false, totalPrice:price};
        }
        case CART_DELETE:{
            let xx:Product[]=[];
            xx = JSON.parse(localStorage.getItem("currentCart"));
            const carts = xx.filter(data=>data._id!==action.payload.data._id);
            console.log("initial = ",state.totalPrice);
            let price = 0;
            for(var x of carts){
                price = price + (x.price)*(x.inCart);
            }
            console.log("totalPrice = ", price); // prints values: 10, 20, 30, 40
            return {...state, ...{carts}, totalPrice:price};
        }
        case CART_ADD:{
            const carts = state.carts.concat(action.payload.data);
            return {...state, ...{carts}};
        }
        case CART_UPDATE:{
            const carts = state.carts.filter(data=>data._id!==action.payload.data.id);
            const updatedCarts = carts.concat(action.payload.data);
            return {...state, ...{carts:updatedCarts}};
        }
        case CART_LIST_ERROR:{
            return {...state, error:true, loading:false};
        }
        default:{
            return state;
        }
    }
}
//selectors (used to access the value present inside state, (it is a kind of BehaviralSubject))
export const getLoading = (state:CartReducerState) => state.loading;
export const getLoaded = (state:CartReducerState) => state.loaded;
export const getError = (state:CartReducerState) => state.error;
export const getCarts = (state:CartReducerState) => state.carts;
export const getCount = (state:CartReducerState) => state.count;
export const getTotalPrice = (state:CartReducerState) => state.totalPrice;


