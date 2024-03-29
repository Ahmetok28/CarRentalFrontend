import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl="https://localhost:7132/api/";
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"Brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)

  }
  getBrandById(brandId: number) : Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"brands/getbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
}
  add(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"brands/add"
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }
  update(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"brands/update"
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }

}
