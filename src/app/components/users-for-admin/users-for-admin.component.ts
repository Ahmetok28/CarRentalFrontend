import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/usersDetails';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-for-admin',
  templateUrl: './users-for-admin.component.html',
  styleUrls: ['./users-for-admin.component.css']
})
export class UsersForAdminComponent implements OnInit {
  users:UserDetails[]=[];
  p:number=0;
  
  constructor(private userService:UserService) {
    
    
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
getAllUsers(){
  this.userService.getUsers().subscribe(response=>{
    this.users=response.data;
  })
}
// tüm kullanıcıları seçmek için kullanılacak fonksiyon
selectAllUsers(event: Event) {
  const target = event.target as HTMLInputElement;
  const checkboxes = document.getElementsByName('options[]');

  checkboxes.forEach((checkbox) => {
    checkbox['checked'] = target.checked;
  });
}


// tek bir kullanıcıyı seçmek için kullanılacak fonksiyon
selectUser(event: Event, id: number) {
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
   openEditModal(user: UserDetails) {
    // düzenleme işlemleri için gerekli kodlar burada yer alacak
    // örneğin modal içinde form doldurma işlemleri
  }

  // silme modalını açmak için kullanılacak fonksiyon
  openDeleteModal(user: UserDetails) {
    // silme işlemleri için gerekli kodlar burada yer alacak
    // örneğin modal içinde onaylama butonuna tıklama işlemi
  }
}
