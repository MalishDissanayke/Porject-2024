import { Order } from './order';
import {Product} from './product';
import { User } from './user';

export class Productorder {
  id: number;
  product: Product;
  qty: number;
  order: Order;
}