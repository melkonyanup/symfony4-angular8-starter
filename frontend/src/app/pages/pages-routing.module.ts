import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [{
  path: '', 
  component: PagesComponent,
  children: [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { 
      path: 'orders', component: OrdersComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
