import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImages } from 'src/app/models/carImages';
import { Cars } from 'src/app/models/cars';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit{
  
  car:Cars[]=[]
  carImage:CarImages[]=[];
  imagePath = "https://localhost:7132/uploads/images/"


  constructor(private carsService:CarsService,private carImageService:CarImageService,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCarImages(params["carId"]);
      } 
      
     
    }); 
    
  }

  getCarDetail(carId:number){
    this.carsService.getByCarId(carId).subscribe(response=>{
      this.car=response.data;
    })
  }
  getCarImages(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe(response=>{
      this.carImage=response.data;
    })
  }
  getImagePath(carImage: CarImages) {
    let path = this.imagePath + carImage.imagePath;
    return path;
   }

}
