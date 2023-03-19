import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit{
  colorAddForm:FormGroup
  constructor(private formBuilder:FormBuilder,private colorService:ColorService, private toastrService:ToastrService){}
 
  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  add(){
    if (this.colorAddForm.valid) {
      let colorModule=Object.assign({},this.colorAddForm.value);
      this.colorService.add(colorModule).subscribe({
        next:(response)=>{
          this.toastrService.success(response.message,"Başarılı")
        },
        error:(responseError)=>{
          console.log(responseError)
              this.toastrService.error(responseError.error.message,"Doğrulama Hatası")
     
        }
      })
    }
    else{
      this.toastrService.error("Hatalı Veya Eksik Veri")
    }
  }

}
