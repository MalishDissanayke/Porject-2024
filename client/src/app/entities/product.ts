import {User} from './user';
import {Supplier} from './supplier';
import {Productstatus} from './productstatus';
import {DataPage} from '../shared/data-page';
import {Productcategory} from './productcategory';
import {Producttype} from './producttype';
import {Productmaterial} from './productmaterial';

export class Product {
  id: number;
  code: string;
  name: string;
  price: number;
  supplier: Supplier;
  productstatus: Productstatus;
  productcategory: Productcategory;
  productmaterialList: Productmaterial[];
  producttype: Producttype;
  description: string;
  creator: User;
  tocreation: string;
}

export class ProductDataPage extends DataPage{
    content: Product[];
}
