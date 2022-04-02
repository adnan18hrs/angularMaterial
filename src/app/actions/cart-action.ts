import { Product } from "../model/product";

export const CART_LIST_COUNT = 'cart list count';
export const CART_LIST_ADDING = 'cart list adding';
export const CART_LIST_ERROR = 'cart list error';
export const CART_DELETE = 'cart delete';
export const CART_UPDATE = 'cart update';
export const CART_ADD = 'cart add';


export class CartAddAction{
    readonly type = CART_ADD;
    constructor(public payload?: {data:Product}){}
}
export class CartDeleteAction{
    readonly type = CART_DELETE;
    constructor(public payload?: {data:Product}){}
}
export class CartListIncreaseCount{
    readonly type = CART_LIST_COUNT;
    constructor(public payload?: {cnt:number}){}
}
export class CartListErrorAction{
    readonly type = CART_LIST_ERROR;
}
export class CartListAddingAction{
    readonly type = CART_LIST_ADDING;
    constructor(public payload?: {data:Product[]}){}
}
export class CartUpdateAction{
    readonly type = CART_DELETE;
    constructor(public payload?: {data:Product[]}){}
}