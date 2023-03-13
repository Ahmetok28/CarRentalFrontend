import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cars } from 'src/app/models/cars';
import { Rental } from 'src/app/models/rental';
import { CarsService } from 'src/app/services/cars.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  car: Cars[] = [];
  rentals: Rental[] = [];
  

  rentalAddForm: FormGroup;
  imageUrl = 'https://localhost:7132/Uploads/images/';

  constructor(
    private formBulilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private carService: CarsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRentalAddForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carService.getByCarId(params['carId']).subscribe((response) => {
          this.car = response.data;
          this.getRentDates(params['carId']);
        });
      }
    });
  }

  navigateToPay(rentalId: number) {
    this.router.navigate(['payment/pay', rentalId]);
  }
  createRentalAddForm() {
    this.rentalAddForm = this.formBulilder.group({
      rentDate: [
        new Date().toISOString().substring(0, 10),
        Validators.required,
      ],
      returnDate: ['', Validators.required],
      customerId: ['', Validators.required],
    });
  }
  add() {
    if (this.rentalAddForm.valid) {
      let rental: Rental = Object.assign({}, this.rentalAddForm.value);
      rental.carId = this.car[0].carId;
      let rentPrice=this.calculateDiff(rental.returnDate,rental.rentDate)*this.car[0].dailyPrice
      this.rentalService.add(rental).subscribe({
        next: (response) => {
          // console.log(rental);
          // console.log((this.calculateDiff(rental.returnDate,rental.rentDate).toString()))

          this.toastrService.success(response.message, 'Başarılı!');
          this.router.navigate([
            '/payment/' +
              this.car[0].carId +
              '/' +
              rentPrice
              
          ]);
        },
        error: (responseError) => {
          this.toastrService.error(responseError.error.message, 'Başarısız!');
        },
      });
    } else {
      this.toastrService.error('Lütfen tüm alanları doldurunuz.', 'Hata!');
    }
  }

  getCarImage(imagePath: string): string {
    const url = `${this.imageUrl}`;
    if (imagePath) {
      return `${url + imagePath}`;
    }
    return url + 'DefaultImage.jpg';
  }

  getRentDates(cardId: number) {
    this.rentalService.getByCarId(cardId).subscribe((response) => {
      this.rentals = response.data;
    });
  }

  calculateDiff(endDate:Date,startDate:Date) {
    const rentDate = new Date(startDate);
    const returnDate = new Date(endDate);

    return Math.floor(
      (Date.UTC(
        returnDate.getFullYear(),
        returnDate.getMonth(),
        returnDate.getDate()
      ) -
        Date.UTC(
          rentDate.getFullYear(),
          rentDate.getMonth(),
          rentDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  }
}
