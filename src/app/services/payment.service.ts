import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Cars } from '../models/cars';
import { AuthService } from './auth.service';
import { Rental } from '../models/rental';
import { NewRental } from '../models/newRental';

@Injectable({
  providedIn: 'root'
})
export class PaymentService  {
  apiUrl = 'https://localhost:7132/api/';

  rental: NewRental;
  payAmount: number = 0;
  rentingCar: Cars;

  creditCardUrl = this.apiUrl+"CreditCards/"
  paymentUrl = this.apiUrl+ "payment/"

  constructor(private httpClient:HttpClient, private authServise:AuthService) { }

  setRental(rental:NewRental, amountPaye:number, car:Cars) {
    this.payAmount = amountPaye;
    this.rental = rental;
    this.rentingCar = car;
    console.log(this.rentingCar);
  }

  add(creditcard:CreditCard) {
    let fullpath = this.creditCardUrl + "add";
    return this.httpClient.post<ResponseModel>(fullpath, creditcard);
  }

  getByCustomerId():Observable<ListResponseModel<CreditCard>> {
    let fullpath = this.creditCardUrl + "getallbycustomerid?customerId=" + this.rental.customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(fullpath);
  }

  pay(card:CreditCard, rental:Rental) {
    let fullPath = this.paymentUrl + "pay";
    let list = [card, rental];
    return this.httpClient.post<CreditCard>(fullPath, list);
  }
  
  getByCustomer(customerId:number):Observable<ListResponseModel<CreditCard>> {
    let fullpath = this.creditCardUrl+ "GetByCustomer?id=" + customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(fullpath);
  }
  
}
 