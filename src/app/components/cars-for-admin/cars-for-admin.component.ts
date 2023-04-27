import { Component, OnInit } from '@angular/core';
import { Cars } from 'src/app/models/cars';
import { Car } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-cars-for-admin',
  templateUrl: './cars-for-admin.component.html',
  styleUrls: ['./cars-for-admin.component.css']
})
export class CarsForAdminComponent implements OnInit{
cars:Cars[]=[];
selectedCar:Car[]=[];
p:number=1;
constructor(private carsService:CarsService) {

  
}
  ngOnInit(): void {
    
    this.getCars();
  }

  getCars(){
    this.carsService.getCars().subscribe(response=>{
      this.cars=response.data;

    })
  }
  // tüm araçları seçmek için kullanılacak fonksiyon
  selectAllCars(event: Event) {
    const target = event.target as HTMLInputElement;
    const checkboxes = document.getElementsByName('options[]');
  
    checkboxes.forEach((checkbox) => {
      checkbox['checked'] = target.checked;
    });
  }
  

  // tek bir aracı seçmek için kullanılacak fonksiyon
  selectCar(event: Event, carId: number) {
    // const target = event.target as HTMLInputElement;
    // if (target.checked) {
    //   this.selectedCar.push(carId);
    // } else {
    //   const index = this.selectedCar.indexOf(carId);
    //   if (index > -1) {
    //     this.selectedCar.splice(index, 1);
    //   }
    // }
  }
  

  // düzenleme modalını açmak için kullanılacak fonksiyon
  openEditModal(car: any) {
    // düzenleme işlemleri için gerekli kodlar burada yer alacak
    // örneğin modal içinde form doldurma işlemleri
  }

  // silme modalını açmak için kullanılacak fonksiyon
  openDeleteModal(car: any) {
    // silme işlemleri için gerekli kodlar burada yer alacak
    // örneğin modal içinde onaylama butonuna tıklama işlemi
  }

}
  
