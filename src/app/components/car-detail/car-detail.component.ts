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
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { NewRental } from 'src/app/models/newRental';
import { PaymentService } from 'src/app/services/payment.service';
import { Car } from 'src/app/models/car';
import { UserService } from 'src/app/services/user.service';
import { UserDetails } from 'src/app/models/usersDetails';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit{
  
  cars:Cars[]=[];
  car:Cars;
  user: UserDetails;
  carImage:CarImages[]=[];
  imagePath = "https://localhost:7132/uploads/images/";
  currentCar:Cars
   rental:Rental[]=[];
   currentRental:Rental
   currentImage: CarImages;
   rentDate: Date;
   returnDate: Date;
   payAmount: number = 0;
  


  constructor(private carsService:CarsService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute,
    private cartService:CartService,
    private toastrService:ToastrService,
    private authService:AuthService,
    private rentalService:RentalService,
    private paymentService:PaymentService,
    private userService:UserService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCarImages(params["carId"]);
        this.sertCurrentCar(params["carId"]);

      }  
    }); 
    this.getUser(this.authService.userId)
    
  }
  navigateToDetails(carId: number) {
    this.router.navigate(['/rentals/add', carId]);
  }

  getUser(id:number) {
    this.userService.getUserById(id).subscribe({
      next:(response)=>{
        if (response.success) {
          this.user = response.data;
        }
      },
      error:(errorResponse)=>{
        console.log(errorResponse);
      }
    }  
    ) 
  }

  getCarDetail(carId:number){
    this.carsService.getCarDetailsByCarIdId(carId).subscribe(response=>{
      this.cars=response.data;
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


  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

addToCart(car:Cars){ 
  
    this.toastrService.success("Sepete eklendi",car.modelName)
    this.cartService.addToCart(car);



}
sertCurrentCar(carId:number){
  this.carsService.getCarDetailsByCarIdId(carId).subscribe(response=>{
    this.car=response.data[0];
  })

}

rentRequest() {
  if (this.authService.isAuthenticated()) {
    if (this.rentDate && this.returnDate) {
      if (this.rentDate < this.returnDate) {

          let newRent: NewRental = {
            carId: this.car.carId,
            customerId: this.user.customerId,
            rentDate: this.rentDate,
            returnDate: this.returnDate
          }
        this.rentalService.checkCarStatus(newRent).subscribe(async response => {
          let rentDate = new Date(this.rentDate);
          let returnDate = new Date(this.returnDate);
          let dateDifference = returnDate.getTime() - rentDate.getTime();
          let numberOfDays = Math.ceil(dateDifference / (1000 * 3600 * 24));
          console.log(numberOfDays);
          if (numberOfDays > 1) {
            this.payAmount = numberOfDays * this.car.dailyPrice;
            this.paymentService.setRental(newRent, this.payAmount, this.car);
            this.toastrService.info("You are being redirected to the payment page...")
            await this.delay(3000);
            this.router.navigate(["/payment"]);
          }
          else {
            this.toastrService.error("you can rent the vehicle for at least one day");
          }
        }, errorResponse => {
          this.toastrService.error(errorResponse.error.message);
          console.log(errorResponse.error.message);
        })
        
        }
        else {
          this.toastrService.error("the rental date must be before the return date")
        }
      }
    else {
      this.toastrService.error("You must choose a rent date and a return date")
  }
  }
  else {
    this.toastrService.error("You must login to continue");
    this.router.navigate(["login"]);
  }
  
}

}
