import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { UserDetails } from '../models/usersDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl='https://localhost:7132/api/auth/'
  userId: number;
  public loggedUser:UserDetails;
  jwt: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService, private userService: UserService) { this.findUser() }


  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }
  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  findUser() {
    if (this.isAuthenticated()) {
      let decodedToken = this.jwt.decodeToken(this.getToken()?.toString());
      let propUserId = Object.keys(decodedToken).filter((u) =>
        u.endsWith('/nameidentifier')
      )[0];
      this.userId = Number(decodedToken[propUserId])
    }
  }

  getUserId() {
    return this.userId;
  }

  catchUser() {
    this.userService.getUserById(this.userId).subscribe(response => {
      this.loggedUser = response.data;
    })
  }

  getUserName(){
    return this.jwt.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }

  getUserRoles(){
    if(this.getToken() != null){
      if (!('http://schemas.microsoft.com/ws/2008/06/identity/claims/role' in this.jwt.decodeToken(this.getToken()?.toString()))){
        return "User";
      }
      return this.jwt.decodeToken(this.getToken()?.toString())["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }else {
      return "User";
    }
  }

  hasRole(role:string):boolean{
    const roles=this.getUserRoles();
    return roles.includes(role);
  }
}
