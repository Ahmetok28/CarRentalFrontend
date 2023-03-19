import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarsService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.createCarAddForm();
  }
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      brandId: ['', Validators.required],
      name: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  add() {
    if (this.carAddForm.valid) {
      let carModule:Car= Object.assign({},this.carAddForm.value)
      
      console.log(carModule)
      
      this.carService.add(carModule).subscribe({
        next:(response)=>{
          this.toastrService.success(response.message,"Başarılı")
        },
        error:(responseError)=>{
          console.log(responseError)
          if(responseError.error.ValidationErrors){
                
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")
            }
            
          }
          else {
            this.toastrService.error(responseError.error.Message,"Hata")
          }
        }
      })
    }
    else{
      this.toastrService.error("Hatalı Veya Eksik Veri")
    }
  }

  
}
