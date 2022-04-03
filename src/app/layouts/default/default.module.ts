import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { AllMaterialFolderModule } from 'src/app/allMaterialFolder/material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from 'src/app/modules/signup/signup.component';
import { ProductComponent } from 'src/app/modules/product/product.component';
import { CartComponent } from 'src/app/modules/cart/cart.component';
import { OrderComponent } from 'src/app/modules/order/order.component';
import { ShippingComponent } from 'src/app/modules/shipping/shipping.component';
import { PaymentComponent } from 'src/app/modules/payment/payment.component';
import { PlaceorderComponent } from 'src/app/modules/placeorder/placeorder.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    LoginComponent,
    SignupComponent,
    ProductComponent,
    CartComponent,
    OrderComponent,
    ShippingComponent,
    PaymentComponent,
    PlaceorderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FlexLayoutModule,
    AllMaterialFolderModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    HighchartsChartModule,
    AllMaterialFolderModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
