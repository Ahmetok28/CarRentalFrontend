import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoriteItem } from 'src/app/models/favoriteItem';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteItems:FavoriteItem[]=[];

  constructor(private favService:FavoriteService,private toastrSerfvice:ToastrService){}
  
  ngOnInit(): void {
    this.getFavs();
  }

  getFavs(){
    this.favoriteItems=this.favService.list();
  }
}
