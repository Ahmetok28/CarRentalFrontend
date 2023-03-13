import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cars } from '../models/cars';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { RentalService } from './rental.service';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  constructor() { }

  addToCart(car:Cars){
    let item = CartItems.find(c=>c.car.carId===car.carId);
    if (item) {
      item.quantity +-1;
    }else{
      let cartItem = new CartItem();
      cartItem.car=car;
      cartItem.quantity=1;
      CartItems.push(cartItem)
    }
  }
  removeFromCart(car:Cars){
    let item:CartItem=CartItems.find(c=>c.car.carId===car.carId);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  list():CartItem[]{
    return CartItems;
  }


}