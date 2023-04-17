import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from 'src/app/services/itemService';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  //styleUrls: ['./items.component.css'],
})

export class ItemsComponent implements OnInit {

  @Input() loading:boolean = true;
  items: Item[] = [];

  constructor(private itemService: ItemService){}

  ngOnInit(): void {
    this.itemService.getItems().subscribe(data =>{
      this.items = data;
      this.loading = false;
    })
  }
}
