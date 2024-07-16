// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // This makes the service available across the application
})
export class DataService {

  constructor(private http: HttpClient) { }

  getYearWiseData(): Observable<any[]> {
    // Replace 'api/endpoint' with your actual API endpoint to fetch year-wise data
    return this.http.get<any[]>('api/endpoint');
  }
}
