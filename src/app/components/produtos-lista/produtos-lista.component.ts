import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IProduto } from './models/IProduto';
import { ProdutosListaService } from './services/produtos-lista.service';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.scss'],
})
export class ProdutosListaComponent implements OnInit {
  @Output() showProductPage = new EventEmitter<number>();

  productList: IProduto[] = [];
  defaultImage = '/assets/system/logo.png';
  idItemDelete!: number;

  constructor(public produtoListaService: ProdutosListaService) {}

  ngOnInit(): void {
    this.bringProducts();
  }

  private bringProducts() {
    this.produtoListaService.readProducts().subscribe((response) => {
      this.productList = response;
    });
  }

  addProduct(): void {
    this.showProductPage.emit();
  }

  editItem(id: number): void {
    this.showProductPage.emit(id);
  }

  deleteItem(): void {
    this.produtoListaService.deleteProduct(this.idItemDelete).subscribe((res) => {
      this.bringProducts();
    });
  }

  setItemDelete(id: number) {
    this.idItemDelete = id;
  }
}
