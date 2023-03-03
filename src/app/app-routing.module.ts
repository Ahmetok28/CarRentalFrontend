import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarsComponent } from './components/cars/cars.component';




const routes: Routes = [
  {path:"",pathMatch:"full",component:CarsComponent},
  {path:"cars",component:CarsComponent},
  {path:"cars/brand/:brandId",component:CarsComponent},
  {path:"cars/color/:colorId",component:CarsComponent},
  {path:"cars/car/:carId",component:CarDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
