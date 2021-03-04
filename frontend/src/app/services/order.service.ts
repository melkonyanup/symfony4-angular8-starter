import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { ResourcesService } from './resources.service';

import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,    
    private resources: ResourcesService
  ) { }

  public list(): Observable<Order[]> {
    return this.http.get<any>(environment.apiUrl + `api/order/list`, { headers: this.resources.getHeaders() })
      .pipe(
        map(res => res.data),
        catchError(err => this.resources.handleError(err)));
  }
  
  public delete(id: number): Observable<Order[]> {
    return this.http.delete<any>(environment.apiUrl + `api/order/delete/${id}`, { headers: this.resources.getHeaders() })
      .pipe(
        map(res => res),
        catchError(err => this.resources.handleError(err)));
  }
}
