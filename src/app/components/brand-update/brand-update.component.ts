import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';

import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  
  updateFormGroup: FormGroup;
  constructor(
    private brandService: BrandService,private router:ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
    
  ) 
    {}
  brand =new FormGroup({
    brandName:new FormControl(''),
    

  });

  ngOnInit(): void {
    

   this.brandService.getBrandById( Number(this.router.snapshot.paramMap.get('brandId'))).subscribe((result:any)=>{
      
      this.brand =new FormGroup({
        brandName:new FormControl(result.data["brandName"], Validators.required),
      
    
      });
    });
  
  }

  
  Update(){
  
    if(this.brand.valid){
      let a:any= this.brand.value.brandName;
      let brand:Brand=Object.assign({id:Number(this.router.snapshot.paramMap.get('brandId'))},{brandName:a})

      this.brandService.update(brand).subscribe({
        next:(response)=>{
          this.toastrService.success(response.message)
        },
      error:(responseError)=>{
        console.log(brand.brandName)
        this.toastrService.error(responseError.message)
      }})
        
        
      
    }
  }
 

}
