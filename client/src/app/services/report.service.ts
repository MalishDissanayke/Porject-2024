import { Injectable } from '@angular/core';
import {PageRequest} from '../shared/page-request';
import {Client, ClientDataPage} from '../entities/client';
import {ApiManager} from '../shared/api-manager';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {



  constructor(private http: HttpClient) { }

  async getYearWiseClientCount(count: number): Promise<any[]>{
    const url = ApiManager.getURL('reports/year-wise-client-count/' + count);

    return await this.http.get<any[]>(url).toPromise();

  }
  async getYearWiseEmployeeCount(count: number): Promise<any[]>{
    const url = ApiManager.getURL('reports/year-wise-employee-count/' + count);

    return await this.http.get<any[]>(url).toPromise();

  }

  async getYearWiseProrderCount(count: number): Promise<any[]>{
    const url = ApiManager.getURL('reports/year-wise-prorder-count/' + count);

    return await this.http.get<any[]>(url).toPromise();

  }
  async getMaterialQuantities(): Promise<any[]> {
    const url = ApiManager.getURL('reports/material-report');
    return await this.http.get<any[]>(url).toPromise();
  }
}
