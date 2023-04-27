import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Customer } from '../models/customer';
import { UserDetails } from '../models/usersDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:7132/api/users";
  customerUrl = "https://localhost:7132/api/customers";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ListResponseModel<UserDetails>> {
    let fullpath = this.apiUrl + "/getuserdetails"
    return this.http.get<ListResponseModel<UserDetails>>(fullpath);
  }

  getUserById(id:number):Observable<SingleResponseModel<UserDetails>> {
    let fullPath = this.apiUrl + "/getuserdetailbyid?id=" + id;
    return this.http.get<SingleResponseModel<UserDetails>>(fullPath);
  }

  updateCustomer(customer:Customer) {
    let fullPath = this.customerUrl + "/update";
    return this.http.post<ResponseModel>(fullPath, customer);
  }

}
