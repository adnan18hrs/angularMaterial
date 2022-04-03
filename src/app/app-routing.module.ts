import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { PostsComponent } from './modules/posts/posts.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ProductComponent } from './modules/product/product.component';
import { SignupComponent } from './modules/signup/signup.component';
import { CartComponent } from './modules/cart/cart.component';
import { OrderComponent } from './modules/order/order.component';
import { ShippingComponent } from './modules/shipping/shipping.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { PlaceorderComponent } from './modules/placeorder/placeorder.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: HomeComponent
  }, {
    path: 'posts',
    component: PostsComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'product/:id',
    component: ProductComponent
  }, {
    path: 'cart',
    component: CartComponent
  }, {
    path: 'order',
    component: OrderComponent
  }, {
    path: 'shipping',
    component: ShippingComponent
  }, {
    path: 'payment',
    component: PaymentComponent
  }, {
    path: 'placeorder',
    component: PlaceorderComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
