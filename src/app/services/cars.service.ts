import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { Cars } from '../models/cars';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  apiUrl="https://localhost:7132/api";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Cars>>{
    let newPath=this.apiUrl+"/cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Cars>>(newPath)
  }

  getCarDetailsByCarIdId(carId:number):Observable<ListResponseModel<Cars>>{
    let newPath=this.apiUrl+"/cars/getbycardetailid?carId="+carId
    return this.httpClient.get<ListResponseModel<Cars>>(newPath)
  }
  getByCarId(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath=this.apiUrl+"/cars/getbycarid?carId="+carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }
  getByBrandId(brandId:number):Observable<ListResponseModel<Cars>>{
    let newPath=this.apiUrl+"/Cars/getbybrandid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Cars>>(newPath)
  }
  getByColorId(colorId:number):Observable<ListResponseModel<Cars>>{
    let newPath=this.apiUrl+"/Cars/getbycolorid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Cars>>(newPath)
  }
  add(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/cars/add"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
  update(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/Cars/update"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
   
}
