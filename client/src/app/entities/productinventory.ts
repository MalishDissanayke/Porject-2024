import {Product} from './product';
import { User } from './user';

export class Productinventory {
id: number;
code: string;
product: Product;
qty: number;
creator: User;
tocreation: Date;
}