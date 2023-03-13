import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarsComponent } from './components/cars/cars.component';
import { PayComponent } from './components/pay/pay.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';




const routes: Routes = [
  {path:"",pathMatch:"full",component:CarsComponent},
  {path:"cars",component:CarsComponent},
  {path:"cars/brand/:brandId",component:CarsComponent},
  {path:"cars/color/:colorId",component:CarsComponent},
  {path:"cars/car/:carId",component:CarDetailComponent},
  {path:"rentals/add/:carId",component:RentalAddComponent},
  {path:"payment/:rentalId/:rentPrice",component:PayComponent}

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
