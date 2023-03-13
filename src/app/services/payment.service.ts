import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService  {
  apiUrl = 'https://localhost:7132/api/Payments/';

  constructor(private httpClient:HttpClient) { }

  getPayments():Observable<ListResponseModel<Card>>{
    let newUrl=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Card>>(newUrl)
  }
  pay(card:Card):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"pay",card)
  }
}
