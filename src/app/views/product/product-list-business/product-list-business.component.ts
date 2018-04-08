import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-product-list-business',
  templateUrl: './product-list-business.component.html',
  styleUrls: ['./product-list-business.component.css']
})
export class ProductListBusinessComponent implements OnInit {
  user = {};
  products = [{}];
  userId: String;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];
    this.productService.findAllProductsForUser(this.userId).subscribe(
      (products: any[]) => {
        this.products = products;
      }
    );
  }

}