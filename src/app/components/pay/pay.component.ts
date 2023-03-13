import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit{
  payAddForm:FormGroup;
  payCount:number;
  constructor(private formBuilder:FormBuilder,
    private paymentService:PaymentService,
    private toastrService:ToastrService,private activatedRoute:ActivatedRoute){}
  
    ngOnInit(): void {
      this.createPayAddForm();
      this.activatedRoute.params.subscribe(params=>{
        this.payCount=Number(params["rentPrice"])
      })
    }
 
    createPayAddForm(){
      this.payAddForm=this.formBuilder.group({
        fullName:["",Validators.required],
        cardNumber:["",Validators.required],
        cvv:["",Validators.required],
        months:["",Validators.required],
        year:["",Validators.required],
      })
    }
    add(){
      if (this.payAddForm.valid) {
        let card:Card = Object.assign({},this.payAddForm.value);
          this.paymentService.pay(card).subscribe({
            next:(response=>{
              this.toastrService.success(response.message,"Başarılı!")
            }),
            error:(errorResponse=>{
              if(errorResponse.error.message){
                this.toastrService.error(errorResponse.error.message,"Doğrulama hatası")
  
              }
            })
          })
      }else {
        this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!")
      }
    }

   
}