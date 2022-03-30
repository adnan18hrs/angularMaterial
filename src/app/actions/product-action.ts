import { Product } from "../model/product";

export const PRODUCT_LIST_REQUEST = 'product list request';
export const PRODUCT_LIST_SUCCESS = 'product list success';
export const PRODUCT_LIST_ERROR = 'product list error';
export const PRODUCT_DELETE = 'product delete';
export const PRODUCT_UPDATE = 'product update';
export const PRODUCT_ADD = 'product add';


export class ProductAddAction{
    readonly type = PRODUCT_ADD;
    constructor(public payload?: {data:Product}){}
}
export class ProductDeleteAction{
    readonly type = PRODUCT_DELETE;
    constructor(public payload?: {id:number}){}
}
export class ProductListRequestAction{
    readonly type = PRODUCT_LIST_REQUEST;
}
export class ProductListErrorAction{
    readonly type = PRODUCT_LIST_ERROR;
}
export class ProductListSuccessAction{
    readonly type = PRODUCT_LIST_SUCCESS;
    constructor(public payload?: {data:Product[]}){}
}
export class ProductUpdateAction{
    readonly type = PRODUCT_UPDATE;
    constructor(public payload?: {data:Product}){}
}