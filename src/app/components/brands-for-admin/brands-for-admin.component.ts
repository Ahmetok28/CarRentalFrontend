import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands-for-admin',
  templateUrl: './brands-for-admin.component.html',
  styleUrls: ['./brands-for-admin.component.css']
})
export class BrandsForAdminComponent implements OnInit {
  brands:Brand[]=[];
  p:number=0;
  
  constructor(private brandService:BrandService) {
    
    
  }
  ngOnInit(): void {
    this.getAllBrands();
  }
getAllBrands(){
  this.brandService.getBrands().subscribe(response=>{
    this.brands=response.data;
  })
}
// tüm markalrı seçmek için kullanılacak fonksiyon
selectAllBrands(event: Event) {
  const target = event.target as HTMLInputElement;
  const checkboxes = document.getElementsByName('options[]');

  checkboxes.forEach((checkbox) => {
    checkbox['checked'] = target.checked;
  });
}


// tek bir markayı seçmek için kullanılacak fonksiyon
selectBrand(event: Event, id: number) {
  // const target = event.target as HTMLInputElement;
  // if (target.checked) {
  //   this.selectedBrand.push(id);
  // } else {
  //   const index = this.selectedBrand.indexOf(id);
  //   if (index > -1) {
  //     this.selectedBrand.splice(index, 1);
  //   }
  // }
}

   // düzenleme modalını açmak için kullanılacak fonksiyon
   openEditModal(brand: Brand) {
    // düzenleme işlemleri için gerekli kodlar burada yer alacak
    // örneğin modal içinde form doldurma işlemleri
  }

  // silme modalını açmak için kullanılacak fonksiyon
  openDeleteModal(brand: Brand) {
    // silme işlemleri için gerekli kodlar burada yer alacak
    // örneğin modal içinde onaylama butonuna tıklama işlemi
  }
}