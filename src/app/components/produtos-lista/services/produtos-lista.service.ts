import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = `https://localhost:7026/Product`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProdutosListaService {
  constructor(private httpClient: HttpClient) {}

  readProducts(): Observable<any> {
    return this.httpClient.get(baseURL);
  }

  readProduct(id: number): Observable<any> {
    return this.httpClient.get(`${baseURL}/${id}`);
  }

  postProduct(data: any): Observable<any> {
    return this.httpClient.post(baseURL, data, httpOptions);
  }

  updateProduct(data: any): Observable<any> {
    return this.httpClient.put(`${baseURL}/`, data, httpOptions);
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(baseURL + '/' + id);
  }

  postProductImage(data: any): Observable<any> {
    return this.httpClient.post(`${baseURL}/images`, data, httpOptions);
  }
}
