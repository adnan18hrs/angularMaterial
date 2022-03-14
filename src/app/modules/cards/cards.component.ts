import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit() {
    console.log("product inside card.ts class = ",this.product.image);
  }

}
