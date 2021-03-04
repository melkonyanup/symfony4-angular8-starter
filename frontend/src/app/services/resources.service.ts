import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor() { }
  
  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  
  public handleError(error: HttpErrorResponse, pageUrl?: string, idModal?: string) {
    const errorMesage: string = error.message || 'Error!';
    Swal.fire('Error!', errorMesage, 'error');
    return throwError(error);
  }
  
  public showAlert(title: string, subtitle: string): Promise<boolean> {
    return new Promise(resolve => {
      Swal.fire({
        title,
        text: subtitle,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F44336',
        cancelButtonColor: '#007BFF',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
