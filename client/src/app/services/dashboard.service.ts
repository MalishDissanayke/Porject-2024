import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  async getRecentEmployeeCount(): Promise<number>{
    const data = await this.http.get<any>(ApiManager.getURL('/dashboard/recent-employee-count')).toPromise();
    return data.count;
  }
  async getRecentMaterialCount(): Promise<number>{
    const data = await this.http.get<any>(ApiManager.getURL('/dashboard/recent-material-count')).toPromise();
    return data.count;
  }
  async getRecentSupplierCount(): Promise<number>{
    const data = await this.http.get<any>(ApiManager.getURL('/dashboard/recent-supplier-count')).toPromise();
    return data.count;
  }

}
