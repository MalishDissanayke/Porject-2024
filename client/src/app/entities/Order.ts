import { DataPage } from '../shared/data-page';
import {Product} from './product';
import { Productorder } from './productorder';
import { User } from './user';


export class Order {
  id: number;
  creator: number;
  orderdate: Date;
  arrivaldate: Date;
  productorder:Productorder[];
  price: number;
}

export class ProductDataPage extends DataPage{
  content: Order[];
}
