import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ProfilePhoto } from '../models/profilePhoto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserPhotoService {

  ppUrl = "https://localhost:7132/api/profilephotos"
  constructor(private httpClient:HttpClient) { }

  addProfilePhoto(userId:number, file:File):Observable<ResponseModel> {
    let fullpath = this.ppUrl + "/update";

    const formData: FormData = new FormData();
    formData.append('UserId', userId.toString());
    formData.append('Image', file);

    return this.httpClient.post<ResponseModel>(fullpath, formData, {reportProgress:true, responseType:"json"});
  }
  getUserpp(userId:number):Observable<ListResponseModel<ProfilePhoto>> {
    let fullPath = this.ppUrl + "/getbyuserid?id=" + userId;
    return this.httpClient.get<ListResponseModel<ProfilePhoto>>(fullPath);
  }
}
