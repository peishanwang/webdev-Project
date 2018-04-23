import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../../../services/review.service.client";
import {ProductService} from "../../../services/product.service.client";
import {SharedService} from "../../../services/shared.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service.client";

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  productId: String;
  product: any;
  reviews: any;
  isReviewer: boolean;
  isObserver: boolean;
  isFavorite: boolean;
  noUser: boolean;
  user : any;
  userId: String;
  favorites = [];
  length: Number;
  reviewPage: any;
  pages = [];
  isAdmin: boolean;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService, private reviewService: ReviewService, private userService: UserService) { }

  ngOnInit() {
    this.isAdmin = this.sharedService.user['type'] == 'ADMIN';
    this.userService.loggedIn().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
        this.user = this.sharedService.user;
        this.userId = this.user['_id'];
        this.isReviewer = (this.user['type'] === 'REVIEWER');
        this.isObserver = (this.user['type'] === 'OBSERVER');
        if (!this.noUser) {
          this.userService.findFavoritesForUser(this.userId).subscribe(
            (data: any) => {
              this.favorites = data;
              console.log(this.favorites);
              for (const favorite of this.favorites) {
                if (favorite['_id'] === this.productId) {
                  this.isFavorite = true;
                  break;
                }
              }
            }
          );
        }
      }
    );
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.productId = params['productId'];
        this.reviewPage = params['reviewPage'];
      }
    );
    this.productService.findProductById(this.productId).subscribe(
      (data: any) => {
        this.product = data;

      }
    );
    this.reviewService.findAllReviewsForProduct(this.productId).subscribe(
      (data: any) => {
        this.reviews = data;
        for (let i = 0; i < Math.ceil(this.reviews.length / 5); i++) {
          this.pages[i] = i;
          console.log(this.pages);
        }
      }
    );

  }

  clickFavoriteButton() {
    console.log(this.isFavorite);
    console.log(this.isFavorite === true);
    if (this.isFavorite) {
      this.userService.deleteFavorite(this.userId, this.productId).subscribe(
        (data: any) => {
          alert('successfully delete from favorite');
          this.isFavorite = false;
        }
      );
    } else {
      console.log(this.userId, this.productId);
      this.userService.addFavorite(this.userId, this.productId).subscribe();
      this.isFavorite = true;
      alert('successfully add to favorite');
    }
  }

}