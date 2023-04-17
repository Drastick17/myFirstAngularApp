import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Message } from '../models/message';

@Injectable({ providedIn: 'root' })
export class ItemService {
  baseUrl: string = 'https://api.escuelajs.co/api/v1/products';
  message: Message = { message: '', status: '' };

  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<Item[]>(`${this.baseUrl}?offset=10&limit=15`);
  }
  getItem(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createItem(body: Item) {
    return this.http.post<Item>(this.baseUrl, { ...body });
  }

  updateItem(id: number, body: any) {
    return this.http.put<Item>(`${this.baseUrl}/${id}`, { ...body });
  }

  deleteItem(id: number) {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
