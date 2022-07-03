import { Component, OnInit } from '@angular/core';
import { IProduto } from '../produtos-lista/models/IProduto';

@Component({
  selector: 'app-inicio-produtos',
  templateUrl: './produtos-inicio.component.html',
  styleUrls: ['./produtos-inicio.component.scss'],
})
export class ProdutosComponent implements OnInit {
  showProduct: boolean = false;
  productId!: number;

  constructor() {}

  ngOnInit(): void {}

  productList() {
    this.showProduct = false;
  }
  addItem($event: number): void {
    this.productId = $event;
    this.showProduct = true;
  }
}
