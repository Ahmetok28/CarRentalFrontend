import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarsComponent } from './components/cars/cars.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PayComponent } from './components/pay/pay.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { LoginGuard } from './guards/login.guard';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { PaySuccesComponent } from './components/pay-succes/pay-succes.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminOrEditorGuard } from './guards/admin-or-editor.guard';

import { CustomerGuard } from './guards/customer.guard';
import { PaymentGuard } from './guards/payment.guard';
import { CarsForAdminComponent } from './components/cars-for-admin/cars-for-admin.component';
import { ColorsForAdminComponent } from './components/colors-for-admin/colors-for-admin.component';
import { BrandsForAdminComponent } from './components/brands-for-admin/brands-for-admin.component';
import { UsersForAdminComponent } from './components/users-for-admin/users-for-admin.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarsComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'cars/brand/:brandId', component: CarsComponent },
  { path: 'cars/color/:colorId', component: CarsComponent },
  { path: 'cars/car/:carId', component: CarDetailComponent },
  { path: 'rentals/add/:carId', component: RentalAddComponent },
  //{ path: 'payment/:rentalId/:rentPrice', component: PayComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'payment', component: PayComponent, canActivate: [CustomerGuard, PaymentGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [] },

  { path: 'admin', component: CarsForAdminComponent , canActivate:[AdminOrEditorGuard]},
  { path: 'admin/cars', component: CarsForAdminComponent , canActivate:[AdminOrEditorGuard]},
  { path: 'admin/cars/:carId', component: CarsForAdminComponent , canActivate:[AdminOrEditorGuard]},
  { path: 'admin/colors', component: ColorsForAdminComponent , canActivate:[AdminOrEditorGuard]},
  { path: 'admin/rentals', component: RentalComponent , canActivate:[AdminOrEditorGuard]},
  { path: 'admin/users', component: UsersForAdminComponent , canActivate:[AdminOrEditorGuard]},
  { path: 'admin/brands', component: BrandsForAdminComponent, canActivate: [AdminOrEditorGuard] },
  
  { path: 'admin/color/add', component: ColorAddComponent,canActivate:[AdminOrEditorGuard] },
  { path: 'admin/cars/add', component: CarAddComponent,canActivate:[AdminOrEditorGuard] },
  { path: 'admin/brand/add', component: BrandAddComponent,canActivate:[AdminOrEditorGuard] },
  { path: 'admin/color/update/:colorId', component: ColorUpdateComponent,canActivate:[AdminOrEditorGuard] },
  { path: 'admin/brand/update/:brandId', component: BrandUpdateComponent ,canActivate:[AdminOrEditorGuard]},
  { path: 'admin/car/update/:carId', component: CarUpdateComponent ,canActivate:[AdminOrEditorGuard]},
  
  
  { path: "successpayment", component: PaySuccesComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
