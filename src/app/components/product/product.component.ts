import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/itemService';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit{
  @Input() item!: Item;
  constructor(private route: ActivatedRoute, private itemService: ItemService){}
  ngOnInit(): void {
    const itemId = this.route.snapshot.params['id'];
    this.itemService.getItem(itemId).subscribe((data :any) =>{
      this.item = data
    })

  }
}
