import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {PageRequest} from '../shared/page-request';
import {ResourceLink} from '../shared/resource-link';
import {Product, ProductDataPage} from '../entities/product';
import {Material} from '../entities/material';
import {Productinventory} from 'src/app/entities/productinventory';
import { Order } from '../entities/order';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  async getAll(pageRequest: PageRequest): Promise<ProductDataPage>{
    const url = pageRequest.getPageRequestURL('products');
    const productDataPage = await this.http.get<ProductDataPage>(ApiManager.getURL(url)).toPromise();
    productDataPage.content = productDataPage.content.map((product) => Object.assign(new Product(), product));
    return productDataPage;
  }

  async getAllOdd(pageRequest: PageRequest): Promise<ProductDataPage>{
    const productDataPage = await this.http.get<ProductDataPage>(ApiManager.getURL('products/getorder')).toPromise();
    productDataPage.content = productDataPage.content.map((order) => Object.assign(new Order(), order));
    return productDataPage;
  }

  
  async getAllProcuts(): Promise<Product[]>{
    return this.http.get<Product[]>(ApiManager.getURL('products/all')).toPromise(); 
 
  }

  async getAllInventory(): Promise<Productinventory[]>{
    return this.http.get<Productinventory[]>(ApiManager.getURL('products/inventoryall')).toPromise(); 
 
  }

  async getAllOrders(): Promise<Order[]>{
    return this.http.get<Order[]>(ApiManager.getURL('products/orderall')).toPromise(); 
 
  }

  async getAllByStatus(pageRequest: PageRequest): Promise<ProductDataPage>{
    const url = pageRequest.getPageRequestURL('products/status');
    const productDataPage = await this.http.get<ProductDataPage>(ApiManager.getURL(url)).toPromise();
    productDataPage.content = productDataPage.content.map((product) => Object.assign(new Product(), product));
    return productDataPage;
  }

  async getAllBasic(pageRequest: PageRequest): Promise<ProductDataPage>{
    const url = pageRequest.getPageRequestURL('products/basic');
    const productDataPage = await this.http.get<ProductDataPage>(ApiManager.getURL(url)).toPromise();
    productDataPage.content = productDataPage.content.map((product) => Object.assign(new Product(), product));
    return productDataPage;
  }

  async get(id: number): Promise<Product>{
    const product: Product = await this.http.get<Product>(ApiManager.getURL(`products/${id}`)).toPromise();
    return Object.assign(new Product(), product);
  }

  async getorder(id: number): Promise<Order>{
    const order: Order = await this.http.get<Order>(ApiManager.getURL(`products/order/${id}`)).toPromise();
    return Object.assign(new Order(), order);
  }

  async delete(id: number): Promise<void>{
    return this.http.delete<void>(ApiManager.getURL(`products/${id}`)).toPromise();
  }

  async deleteorder(id: number): Promise<void>{
    return this.http.delete<void>(ApiManager.getURL(`products/order/${id}`)).toPromise();
  }

  async add(product: Product): Promise<ResourceLink>{
    return this.http.post<ResourceLink>(ApiManager.getURL(`products`), product).toPromise();
  }

  async addOrder(order: Order): Promise<ResourceLink>{
    return this.http.post<ResourceLink>(ApiManager.getURL(`products/order`), order).toPromise();
  }

  async addInventory(productinventory: Productinventory): Promise<ResourceLink>{
    return this.http.post<ResourceLink>(ApiManager.getURL(`products/inventory`), productinventory).toPromise();
  }

  async update(id: number, product: Product): Promise<ResourceLink>{
    return this.http.put<ResourceLink>(ApiManager.getURL(`products/${id}`), product).toPromise();
  }

  async updateorder(id: number, order: Order): Promise<ResourceLink>{
    return this.http.put<ResourceLink>(ApiManager.getURL(`products/order/${id}`), order).toPromise();
  }


  async getAllMaterials(): Promise<Material[]> {
    const materials = await this.http.get<Material[]>(ApiManager.getURL('materials')).toPromise();
    return materials.map((material) => Object.assign(new Material(), material));
  }
}
