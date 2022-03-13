import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() sno: string;
  @Input() title: string;
  @Input() price: string;
  @Input() stock: BigInteger;
  @Input() data = [];

  constructor() { }

  ngOnInit() {
  }

}
