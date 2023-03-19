import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  updateColorForm : FormGroup;
  selectedColor : Color;
  
  

  constructor(private formBuilder : FormBuilder,private colorService : ColorService,
    private activatedRoute:ActivatedRoute, private toastrService : ToastrService) { }
  ngOnInit(): void {
    this.createUpdateColorForm();
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
        let id = + params["colorId"]
        this.colorService.getColorById(id).subscribe(response=>{
          this.selectedColor = response.data;
          this.updateColorForm.patchValue(this.selectedColor)
        })
      }
    })

  }

  createUpdateColorForm(){
    this.updateColorForm = this.formBuilder.group({
      id: new FormControl({ value: '', disabled: true }, Validators.required),
      colorName : ["",Validators.required],
    })
  }

  update(){
    if(this.updateColorForm.valid){
      let updatedColor : Color = this.updateColorForm.value as Color;
      updatedColor.id = this.selectedColor.id;
      this.colorService.update(updatedColor).subscribe({
        next:(response)=>{
          this.toastrService.success(response.message)
        },
        error:(responseError)=>{
          
          if(responseError.error.ValidationErrors){
                
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")
            }
            
          }
          else {
            this.toastrService.error(responseError.error.Message,"Hata")
          }
        }
      }

     
      )
    }
    else{
      this.toastrService.error("Lütfen alanları doğru şekilde doldurun")
    }
  }
}
