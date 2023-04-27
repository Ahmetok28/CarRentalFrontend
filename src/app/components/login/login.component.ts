import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService:AuthService,private toastrService:ToastrService,private router:Router) {}

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(){
    if(this.loginForm.valid){
      let loginModel=Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe({
        next:async response =>{
          this.toastrService.info(response.message)
          console.log(response.data.token);
          localStorage.setItem("token",response.data.token)
          this.navigateToHome();
        },
        error:(errorResponse)=>{
          console.log(errorResponse)
          this.toastrService.error(errorResponse.error)
        }
      })
    }
  }
  navigateToRegister(){
    this.router.navigate(["register"]);
  }
  navigateToHome(){
    window.location.href = "/cars";
  }
}
