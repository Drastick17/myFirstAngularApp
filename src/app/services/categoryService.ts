import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/item';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  baseUrl: string = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) {}

  getCategory(id: number) {
    return this.http.get<Category>(
      `https://api.escuelajs.co/api/v1/categories/${id}`
    );
  }

  getCategories() {
    return this.http.get<Category[]>(
      'https://api.escuelajs.co/api/v1/categories?offset=0&limit=10'
    );
  }
  
}
