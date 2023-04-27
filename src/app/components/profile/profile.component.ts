import { Component, OnInit } from '@angular/core';
import { ProfilePhoto } from 'src/app/models/profilePhoto';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { UserDetails } from 'src/app/models/usersDetails';
import { AuthService } from 'src/app/services/auth.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserPhotoService } from 'src/app/services/user-photo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userPpService: UserPhotoService,
    private authService: AuthService,
    private rentalService: RentalService
  ) {}
  imagePath: string = 'https://localhost:7132/Uploads/images/ProfilePhotos/';
  profilePhotoPath: string;
  user: UserDetails;
  rentals:Rental[]=[];
  userId: number = this.authService.userId;
  ngOnInit(): void {
    this.getUserPp(this.userId);
    this.getUser(this.userId);
  }
  getUserPp(userId: number) {
    this.userPpService.getUserpp(userId).subscribe((response) => {
      let profilePhoto: ProfilePhoto = response.data[0];
      this.profilePhotoPath = this.imagePath + profilePhoto.imagePath;
    });
  }
  getUser(userId: number) {
    this.userService.getUserById(userId).subscribe((response) => {
      this.user = response.data;
      this.getRentals(this.user.customerId);
    });
  }
  getRentals(customerId: number) {
    this.rentalService.getByCustomerId(customerId).subscribe((response) => {
      this.rentals=response.data;
    });
  }
}
