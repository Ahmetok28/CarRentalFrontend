import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Cars } from 'src/app/models/cars';
import { CreditCard } from 'src/app/models/creditCard';
import { NewRental } from 'src/app/models/newRental';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { UserDetails } from 'src/app/models/usersDetails';
import { AuthService } from 'src/app/services/auth.service';

import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pay', 
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit{
  car: Cars = this.paymentService.rentingCar;
  rentingData: NewRental = this.paymentService.rental;
  payAmount: number = this.paymentService.payAmount;

  cardAddForm: FormGroup;

  cards: CreditCard[];
  creditCardsLength:number=0;
  targetCard: CreditCard;

  user: UserDetails;

  constructor(private paymentService:PaymentService, private rentalService:RentalService, private formBuilder:FormBuilder, private toastrSerice:ToastrService, private userService:UserService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.createCardAddForm();
    console.log(this.rentingData.customerId);
    this.getAllCards();
    this.getUser(this.authService.userId);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  createCardAddForm() {
    this.cardAddForm = this.formBuilder.group({
      customerId: [this.rentingData.customerId],
      cardNumber: ["", Validators.required],
      fullName: ["", Validators.required],
      month: ["", Validators.required],
      year: ["", Validators.required],
      cvv: ["", Validators.required]
    })
  }

  addCard() {
    if (this.cardAddForm.valid) {
      let cardModel: CreditCard = Object.assign({},this.cardAddForm.value);
      console.log(cardModel);
      this.paymentService.add(cardModel).subscribe({
        next:(response)=>{
          this.pay();},
        error:(responseError)=> {
          this.toastrSerice.error(responseError.error.Message);
          console.log(responseError);
        }
      });
    }
    else {
      let cardModel: CreditCard = Object.assign({},this.cardAddForm.value);
      console.log(cardModel);
      this.toastrSerice.error("Form eksik")
    }
  }

  getAllCards() {
    this.paymentService.getByCustomerId().subscribe(response => {
      console.log(response);
      this.cards = response.data;
      this.creditCardsLength=response.data.length;
    })
  }


  pay() {
    if (this.targetCard) {
      if (this.user.findeksPoint > this.car.minFindeksPoint) {
        this.rentalService.add(this.rentingData).subscribe({
          next: (response) => {
            this.toastrSerice.success(response.message, "Succesfully Paying");
            this.router.navigate(["/successpayment"]);
          },
          error: async (errorResponse) => {
            this.toastrSerice.error(errorResponse.error.message);
            await this.delay(2000);
            this.router.navigate(["/cars"]);
          } 
        });
      }
      else {
        console.log(this.user.findeksPoint , this.car.minFindeksPoint)
        this.toastrSerice.error("Your Findex Point is not enough")
      }
    }
    else {
      this.toastrSerice.warning("Which One!")
    }
  }
  

  async payWithNewCard() {
    await this.delay(1000);
    if (this.cardAddForm.value.cardNumber.length == 16) {
      if (this.cardAddForm.value.expMonth <= 12) {
        if (this.cardAddForm.value.expYear > 21) {
          if (this.cardAddForm.value.cvc.length > 2 && this.cardAddForm.value.cvc.length < 5) {
            this.pay();
          }
          else {
            this.toastrSerice.error("CVC must be 3 or 4 digits")
          }
        }
        else {
          this.toastrSerice.error("This card has expired")
        }
      }
      else {
        this.toastrSerice.error("There are 12 months in a year")
      }
    }
    else {
      this.toastrSerice.error("Card Number consist of 16 characters");
    }
  }

  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  targetThisCard(card:CreditCard) {
    this.targetCard = card;
  }

  targetNewCard() {
    if (this.cardAddForm.valid) {
      let cardModel = Object.assign({}, this.cardAddForm.value);
      this.targetCard = cardModel;
    }
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
  })
  }
}