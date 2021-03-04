import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatSortModule
} from '@angular/material';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    PagesComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule
  ]
})
export class PagesModule { }
