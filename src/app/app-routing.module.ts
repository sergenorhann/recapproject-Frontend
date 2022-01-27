import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorComponent } from './components/color/color.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent  } from "./components/register/register.component";
import { LogoutGuard } from './guards/logout.guard';
import { AccountComponent } from "./components/account/account.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/getallbycolorid/:colorid', component: CarComponent },
  { path: 'cars/cardetailbycarid/:carid', component: CarDetailComponent },
  { path: 'cars/add', component: CarAddComponent, canActivate:[LoginGuard]},
  { path: 'carsdetail', component: CarDetailComponent },
  { path: 'cars/getallbyfilter/:colorId/:brandId', component: CarComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'colors', component: ColorComponent },
  { path: 'login', component: LoginComponent , canActivate:[LogoutGuard] },
  { path: 'rentals', component: RentalComponent },
  { path: 'carrent', component: CarRentComponent },
  { path: 'register', component: RegisterComponent , canActivate:[LogoutGuard]},
  { path: 'navi', component: HomeComponent },
  {path: "account", component:AccountComponent, canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
