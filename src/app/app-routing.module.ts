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
import { PayComponent } from './components/pay/pay.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarsComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'cars/brand/:brandId', component: CarsComponent },
  { path: 'cars/color/:colorId', component: CarsComponent },
  { path: 'cars/car/:carId', component: CarDetailComponent },
  { path: 'rentals/add/:carId', component: RentalAddComponent },
  { path: 'payment/:rentalId/:rentPrice', component: PayComponent },
  { path: 'color/add', component: ColorAddComponent },
  { path: 'car/add', component: CarAddComponent },
  { path: 'brand/add', component: BrandAddComponent },
  { path: 'color/update/:colorId', component: ColorUpdateComponent },
  { path: 'brand/update/:brandId', component: BrandUpdateComponent },
  { path: 'car/update/:carId', component: CarUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
