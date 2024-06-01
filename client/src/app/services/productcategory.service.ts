import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Productcategory} from '../entities/productcategory';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {
  constructor(private http: HttpClient) { }

  async getAll(): Promise<Productcategory[]>{
    const productcategories = await this.http.get<Productcategory[]>(ApiManager.getURL('productcategories')).toPromise();
    return productcategories.map((productcategory) => Object.assign(new Productcategory(), productcategory));
  }

}
