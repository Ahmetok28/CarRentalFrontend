import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat:['',Validators.required]
    });
  }
  register(){
    
    if(this.registerForm.valid){
      if(this.passwordMatch()){
        let registerModel = new RegisterModel();
        registerModel.email = this.registerForm.value.email;
        registerModel.firstName = this.registerForm.value.firstName;
        registerModel.lastName = this.registerForm.value.lastName;
        registerModel.password = this.registerForm.value.password;
        console.log(registerModel)
        this.authService.register(registerModel).subscribe({
          next:(response)=>{
            this.toastrService.info(response.message)
            console.log(response);
            localStorage.setItem("token",response.data.token)
          },
          error:(errorResponse)=>{
            console.log(errorResponse)
            this.toastrService.error(errorResponse.error)
          }
        })

      }
      else{
        this.toastrService.error("Şifreler Uyuşmuyor")
      }
    }else{
      this.toastrService.error("Lütfen Tüm Alanları Doldurunuz","Hata")
    }
  }

  passwordMatch():boolean{
    return this.registerForm.value.password===this.registerForm.value.passwordRepeat;
  }

  navigateToLogin(){
    this.router.navigate(["login"])
  }
}
