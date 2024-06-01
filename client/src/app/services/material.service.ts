import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';
import {PageRequest} from '../shared/page-request';
import {ResourceLink} from '../shared/resource-link';
import {Material, MaterialDataPage} from '../entities/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  async getAll(pageRequest: PageRequest): Promise<MaterialDataPage>{
    const url = pageRequest.getPageRequestURL('materials');
    const materialDataPage = await this.http.get<MaterialDataPage>(ApiManager.getURL(url)).toPromise();
    materialDataPage.content = materialDataPage.content.map((material) => Object.assign(new Material(), material));
    return materialDataPage;
  }

  async getAllBasic(pageRequest: PageRequest): Promise<MaterialDataPage>{
    const url = pageRequest.getPageRequestURL('materials/basic');
    const materialDataPage = await this.http.get<MaterialDataPage>(ApiManager.getURL(url)).toPromise();
    materialDataPage.content = materialDataPage.content.map((material) => Object.assign(new Material(), material));
    return materialDataPage;
  }

  // async getAllBasicMaterialProduct(pageRequest: PageRequest): Promise<MaterialDataPage>{
  //   const url = pageRequest.getPageRequestURL('materials/basic');
  //   const materialDataPage = await this.http.get<MaterialDataPage>(ApiManager.getURL(url)).toPromise();
  //   materialDataPage.content = materialDataPage.content.map((material) => Object.assign(new Material(), material));
  //
  //   return  materialDataPage;
  // }
  async getAllBasics(materierialId: number): Promise<Material[]>{
    if (materierialId === null) { return []; }

    let materials = await this.http.get<Material[]>(ApiManager.getURL('materials/basic/' + materierialId)).toPromise();
    materials = materials.map((item) => Object.assign(new Material(), item));
    return materials;
  }


  async getAllBySupplier(id: number): Promise<Material[]>{
    let materials = await this.http.get<Material[]>(ApiManager.getURL(`materials/supplier/${id}`)).toPromise();
    materials = materials.map((material) => Object.assign(new Material(), material));
    return materials;
  }
  async getAllMaterials(): Promise<Material[]> {
    let materials = await this.http.get<Material[]>(ApiManager.getURL('materials')).toPromise();
    materials = materials.map((material) => Object.assign(new Material(), material));
    return materials;
  }

  async getAllByMaterial(id: number): Promise<Material[]>{
    let materials = await this.http.get<Material[]>(ApiManager.getURL(`materials/${id}`)).toPromise();
    materials = materials.map((material) => Object.assign(new Material(), material));
    return materials;
  }
  async getAllBasicBySupplier(supplietId: number): Promise<Material[]>{

    if (supplietId === null) { return []; }

    let materials = await this.http.get<Material[]>(ApiManager.getURL('materials/basic/' + supplietId)).toPromise();
    materials = materials.map((item) => Object.assign(new Material(), item));
    return materials;
  }

  async getAllByPorder(id: number): Promise<Material[]>{
    let materials = await this.http.get<Material[]>(ApiManager.getURL(`materials/${id}`)).toPromise();
    materials = materials.map((material) => Object.assign(new Material(), material));
    return materials;
  }

  async getAllByProduct(id: number): Promise<Material[]>{
    let materials = await this.http.get<Material[]>(ApiManager.getURL(`materials/product/${id}`)).toPromise();
    materials = materials.map((material) => Object.assign(new Material(), material));
    return materials;
  }


  async get(id: number): Promise<Material>{
    const material: Material = await this.http.get<Material>(ApiManager.getURL(`materials/${id}`)).toPromise();
    return Object.assign(new Material(), material);
  }


  async delete(id: number): Promise<void>{
    return this.http.delete<void>(ApiManager.getURL(`materials/${id}`)).toPromise();
  }

  async add(material: Material): Promise<ResourceLink>{
    return this.http.post<ResourceLink>(ApiManager.getURL(`materials`), material).toPromise();
  }

  async update(id: number, material: Material): Promise<ResourceLink>{
    return this.http.put<ResourceLink>(ApiManager.getURL(`materials/${id}`), material).toPromise();
  }

}
