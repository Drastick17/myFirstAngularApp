import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { FormComponent } from './components/add/add.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {path: '', component: ItemsComponent},
  {path: ':id', component: FormComponent},
  {path: 'products/:id', component: ProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
