import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Findeks } from '../models/findeks';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {

  apiUrl="https://localhost:7132/api/Findeks/"
  constructor(private httpClient: HttpClient) { }
  
  getByCustomerId(
    customerId: number
  ): Observable<SingleResponseModel<Findeks>> {
    return this.httpClient.get<SingleResponseModel<Findeks>>(
      `${this.apiUrl}/getbycustomerid`,
      {
        params: {
          customerId: customerId.toString(),
        },
      }
    );
  }
}

