import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarImages } from 'src/app/models/carImages';
import { Cars } from 'src/app/models/cars';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarsService } from 'src/app/services/cars.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit{
  
  car:Cars[]=[]
  carImage:CarImages[]=[];
  imagePath = "https://localhost:7132/uploads/images/";
  currentCar:Cars
   rental:Rental[]=[];
   currentRental:Rental
   currentImage: CarImages;



  constructor(private carsService:CarsService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute,
    private cartService:CartService,
    private toastrService:ToastrService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCarImages(params["carId"]);
      } 
      
     
    }); 
    
  }
  navigateToDetails(carId: number) {
    this.router.navigate(['/rentals/add', carId]);
  }

  getCarDetail(carId:number){
    this.carsService.getCarDetailsByCarIdId(carId).subscribe(response=>{
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

     
   setCurrentRental(rental:Rental){
    this.currentRental=rental;
  }




addToCart(car:Cars){ 
  
    this.toastrService.success("Sepete eklendi",car.modelName)
    this.cartService.addToCart(car);



}
sertCurrentCar(car:Cars){
  this.currentCar=car;
}



}
