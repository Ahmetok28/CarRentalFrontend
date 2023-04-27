import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-colors-for-admin',
  templateUrl: './colors-for-admin.component.html',
  styleUrls: ['./colors-for-admin.component.css']
})
export class ColorsForAdminComponent implements OnInit {
  colors:Color[]=[];
  p:number=0;
  
  constructor(private colorService:ColorService) {
    
    
  }
  ngOnInit(): void {
    this.getAllColors();
  }
getAllColors(){
  this.colorService.getColors().subscribe(response=>{
    this.colors=response.data;
  })
}
// tüm renkleri seçmek için kullanılacak fonksiyon
selectAllColors(event: Event) {
  const target = event.target as HTMLInputElement;
  const checkboxes = document.getElementsByName('options[]');

  checkboxes.forEach((checkbox) => {
    checkbox['checked'] = target.checked;
  });
}


// tek bir rengi seçmek için kullanılacak fonksiyon
selectColor(event: Event, id: number) {
  // const target = event.target as HTMLInputElement;
  // if (target.checked) {
  //   this.selectedColor.push(id);
  // } else {
  //   const index = this.selectedColor.indexOf(id);
  //   if (index > -1) {
  //     this.selectedColor.splice(index, 1);
  //   }
  // }
}

   // düzenleme modalını açmak için kullanılacak fonksiyon
   openEditModal(color: Color) {
    // düzenleme işlemleri için gerekli kodlar burada yer alacak
    // örneğin modal içinde form doldurma işlemleri
  }

  // silme modalını açmak için kullanılacak fonksiyon
  openDeleteModal(color: Color) {
    // silme işlemleri için gerekli kodlar burada yer alacak
    // örneğin modal içinde onaylama butonuna tıklama işlemi
  }
}
