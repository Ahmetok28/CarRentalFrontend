import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cars } from 'src/app/models/cars';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit{
  
  cars:Cars[]=[];
  currentCar:Cars;
  imageUrl="https://localhost:7132/Uploads/images/"
  constructor(private carsService:CarsService,private activatedRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } 
      else if (params['colorId']) {
        this.getCarByColor(params['colorId']);
      // } else if (params['carId']) {
      //   this.getCarById(params['carId']);
      } 
      else {
        this.getCars();
        
      }
    }); 
  }

    getCars(){
      this.carsService.getCars().subscribe(response=>{
        this.cars=response.data;
      })
    }
    getCarImage(car: Cars): string {
    
      const url = `${this.imageUrl}`;
      if (car.imagePath) {
        return `${url+car.imagePath}`;
      }
      return url + 'DefaultImage.jpg';
    }
      
    setCurrentCar(car: Cars) {
      this.currentCar = car;
    }
    getCarByColor(colorId: number) {
      this.carsService.getByColorId(colorId).subscribe((response) => {
        this.cars = response.data;
        
      });
    }
    getCarsByBrand(brandId: number) {
      this.carsService.getByBrandId(brandId).subscribe((response) => {
        this.cars = response.data;
        
      });
    }
}
