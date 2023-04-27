import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-pay-succes',
  templateUrl: './pay-succes.component.html',
  styleUrls: ['./pay-succes.component.css']
})
export class PaySuccesComponent implements OnInit {

  constructor(private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.paymentService.payAmount = 0;
  }

 

}