import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarResponseModel } from '../models/carResponse';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:7132/api/Cars/GetCardetails";
  constructor(private httpClient: HttpClient) { }

  getCars():Observable<CarResponseModel>{
    return this.httpClient.get<CarResponseModel>(this.apiUrl);
  }
}
 