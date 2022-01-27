import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';

import {ToastrModule} from "ngx-toastr";
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';


import { MatFormFieldModule } from '@angular/material/form-field'; 

import { MatInputModule } from '@angular/material/input';
import { NgxPaymentCardModule } from 'ngx-payment-card'; 

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    RentalComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    CarDetailComponent,
    CarImageComponent,
    CartSummaryComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarFilterComponent,
    CarFilterPipe,
    ColorFilterPipe,
    BrandFilterPipe,
    LoginComponent,
    HomeComponent,
    CarRentComponent,
    RegisterComponent,
    AccountComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxPaymentCardModule,
    MatInputModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
