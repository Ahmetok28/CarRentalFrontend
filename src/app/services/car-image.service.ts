import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImages } from '../models/carImages';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:7132/api";
  constructor(private httpClient:HttpClient) { }
  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImages>>{
    let newPath=this.apiUrl+"/CarImages/getbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath)
  }

}
