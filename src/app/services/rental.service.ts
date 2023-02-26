import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from '../models/rentalResponse';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:7132/api/Rentals/getRentalsDetail";
  constructor(private httpClient:HttpClient ) { }

  getRentals():Observable<RentalResponseModel>{
    return this.httpClient.get<RentalResponseModel>(this.apiUrl);
  }
}
