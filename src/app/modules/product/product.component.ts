import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product:Product;
  constructor() { }

  ngOnInit() {
    this.product = JSON.parse(localStorage.getItem('currentProduct'));
  }

}
