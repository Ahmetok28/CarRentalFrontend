import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  brandForm = new FormGroup({
    brand: new FormControl(this.brands),
  });
  
  
  currentBrand:Brand|null;
  selectedBrand: Brand;
  filterText=""

 

  constructor(private brandService: BrandService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.getBrands();

    
  }
  

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }
  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item active"
    }
    else{ 
      return "list-group-item"
    }
  }
  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active"
    }
    else{ 
      return "list-group-item" 
    }
  }
  deleteCurrentBrand(){
    this.currentBrand=null;
  }
  
  

onBrandSelect(id: number) {
  this.selectedBrand = this.brands.find(brand => brand.id == id);
}
  

}
