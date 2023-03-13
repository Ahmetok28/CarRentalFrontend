import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cars } from 'src/app/models/cars';
import { CarsService } from 'src/app/services/cars.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit{
  
  cars:Cars[]=[];
 
  currentCar:Cars;
  filterText=""

  imageUrl="https://localhost:7132/Uploads/images/"
  constructor(private carsService:CarsService,private activatedRoute:ActivatedRoute,
    private favService:FavoriteService,private toastrService:ToastrService
    ){}
  
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
        this.cars.forEach(C=>C.isFavorite=false)

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

    addToFavorites(car:Cars){
      if(car.isFavorite===true){
        car.isFavorite=false;
        this.favService.removeFavorite(car)
        this.toastrService.error(car.modelName," Favorilerden silindi")
      }
      else{
        this.favService.addFavorite(car);
        car.isFavorite=true;
        this.toastrService.success(car.modelName," Favorilere Eklendi")
      }
      
    }
 
    

    
}
