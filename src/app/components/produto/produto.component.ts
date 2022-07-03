import { Component, Input, OnInit } from '@angular/core';
import { IProduto } from '../produtos-lista/models/IProduto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosListaService } from '../produtos-lista/services/produtos-lista.service';
import { IProdutoImagem } from '../produtos-lista/models/IProdutoImagem';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent implements OnInit {
  @Input() productId!: number;
  formProduto!: FormGroup;
  formProdutoClean = {};
  product!: IProduto;
  images: IProdutoImagem[] = [];
  showForm = false;
  letUpload = false;

  constructor(
    private formBuilder: FormBuilder,
    private produtosListaService: ProdutosListaService
  ) {}

  ngOnInit(): void {
    this.productId ? this.getData(this.productId) : this.loadData(this.product);
  }
  getData(id: number) {
    this.letUpload = true;
    this.produtosListaService.readProduct(id).subscribe((resp) => {
      this.product = resp;
      this.product.productImages?.forEach((image) => {
        this.images.push(image);
      });
      this.loadData(this.product);
    });
  }
  loadData(data: any) {
    this.formProduto = this.formBuilder.group({
      id: [data ? data.id : null, Validators.nullValidator],
      nome: [data ? data.nome : null, Validators.required],
      codigo: [data ? data.codigo : null, Validators.required],
      preco: [data ? data.preco : null, Validators.required],
      precoPromocional: [
        data ? data.precoPromocional : null,
        Validators.required,
      ],
      categoriaDesc: [data ? data.categoriaDesc : null, Validators.required],
    });
    this.formProdutoClean = this.formProduto.value;
    this.showForm = true;
    data ? (this.letUpload = true) : (this.letUpload = false);
  }

  saveBtn() {
    this.formProduto.controls['id'].value
      ? this.updateProduct()
      : this.addNewProduct();
  }

  cancelBtn(): void {
    this.formProduto.reset(this.formProdutoClean);
  }

  addNewProduct() {
    let data = JSON.stringify(this.formProduto.value);
    this.produtosListaService.postProduct(data).subscribe((res) => {
      this.getData(res);
    });
  }

  updateProduct() {
    let data = JSON.stringify(this.formProduto.value);

    this.produtosListaService.updateProduct(data).subscribe((res) => {
      console.log('alert');
    });
  }

  newFileData(event: any) {
    this.produtosListaService
      .postProductImage(
        JSON.stringify({
          caminho: event,
          productId: this.formProduto.controls['id'].value,
          ordem: 1,
        })
      )
      .subscribe((res) => {
        this.images ? this.images.push(res) : (this.images = res);
      });
  }

  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century'
  ];
  drop() {
    //moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }
}
