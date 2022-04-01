import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AllMaterialFolderModule } from 'src/app/allMaterialFolder/material.module';
import { rootReducer } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApiService } from './service/app.service';
import { HttpService } from './service/http.service';
import { YoutubeRepository } from './service/youtube-repository';
import { ProductComponent } from './modules/product/product.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FlexLayoutModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    AllMaterialFolderModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DefaultModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    
  ],
  providers: [HeaderComponent, ApiService, HttpService, YoutubeRepository, ProductComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
