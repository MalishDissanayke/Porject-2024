import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Productstatus} from '../entities/productstatus';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class ProductstatusService {
  constructor(private http: HttpClient) { }

  async getAll(): Promise<Productstatus[]>{
    const productstatuses = await this.http.get<Productstatus[]>(ApiManager.getURL('productstatuses')).toPromise();
    return productstatuses.map((productstatus) => Object.assign(new Productstatus(), productstatus));
  }

}
