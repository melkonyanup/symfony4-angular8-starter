import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';

import { ResourcesService } from '../../services/resources.service';
import { OrderService } from '../../services/order.service';

import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  filterParams = {
    customer: "",
    status: ""
  }

  statuses = ["in_production", "pending", "cancelled"];

  orderList: Order[] = [];

  displayedColumns: string[] = ['date', 'customer', 'address1', 'city', 'postcode', 'country', 'amount', 'status', 'actions'];
  dataSource = new MatTableDataSource<Order>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private resources: ResourcesService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getOrderList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private getOrderList() {
    this.orderService.list().subscribe(res => {
      this.orderList = [];
      res.forEach((order) => {
        order.date = moment(order.date).format('MM/DD/YYYY HH:mm:ss');
        this.orderList.push(order);
      })
      this.dataSource = new MatTableDataSource<Order>(this.orderList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public async cancelOrder(order: Order) {
    const validated: boolean = await this.resources.showAlert('Are you sure you want to cancel this order?', 'You will not be able to undo this action');
    if (validated) {
      this.orderService.delete(order.id).subscribe(res => {
        this.getOrderList();
      });
    }
  }

  private filter() {
    const filterCustomer = this.filterParams.customer.toLowerCase();
    const founded: Order[] = this.orderList.filter(order => 
      (this.filterParams.customer != "" && order.customer.toLowerCase().includes(filterCustomer) || this.filterParams.customer == "") &&
      (this.filterParams.status != "" && order.status === this.filterParams.status || this.filterParams.status == "")
    );
    this.dataSource = new MatTableDataSource<Order>(founded);
    this.dataSource.paginator = this.paginator;
  }

  public filterByCustomer($event: string) {
    this.filterParams.customer = $event;
    this.filter();
  }

  public filterByStatus($event: string) {
    this.filterParams.status = $event;
    this.filter();
  }

  public clearFilters() {
    this.filterParams = {
      customer: "",
      status: ""
    };
    this.filter();
  }
}
