import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  createProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, productData);
  }

  updateProduct(productData: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}`, productData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/?id=${id}`);
  }
}
