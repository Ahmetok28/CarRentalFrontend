import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { NewRental } from '../models/newRental';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:7132/api/Rentals/";
  constructor(private httpClient:HttpClient ) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"getRentalsDetail"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  add(rental:NewRental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",rental)
  }
  getByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"getRentalByCarId?carId="+carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getByCustomerId(customerId:number):Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"getbycustomerid?customerId="+customerId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  checkCarStatus(rental: NewRental):Observable<ResponseModel> {
    let fullPath = this.apiUrl + "checkcarstatus";
    return this.httpClient.post<ResponseModel>(fullPath, rental);
  }
}
