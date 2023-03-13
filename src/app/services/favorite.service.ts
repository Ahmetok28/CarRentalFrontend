import { Injectable } from '@angular/core';
import { Cars } from '../models/cars';
import { FavoriteItem } from '../models/favoriteItem';
import { FavoriteItems } from '../models/favoriteItems';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() { }

  addFavorite(car:Cars){
    let item = FavoriteItems.find(c=>c.car.carId===car.carId);
   
      let favItem= new FavoriteItem;
      favItem.car=car;
      FavoriteItems.push(favItem)
    
  }
  removeFavorite(car:Cars){
    let item = FavoriteItems.find(c=>c.car.carId===car.carId);
    FavoriteItems.splice(FavoriteItems.indexOf(item),1);
  }
  list():FavoriteItem[]{
    return FavoriteItems;
  }

}
