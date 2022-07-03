import { IProdutoImagem } from "./IProdutoImagem";

export interface IProduto {
  id: number;
  nome: string;
  codigo: number;
  preco: number;
  precoPromocional: number;
  categoriaDesc: string;
  productImages?: [IProdutoImagem]
}
