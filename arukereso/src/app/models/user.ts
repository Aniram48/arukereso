import{Product} from './product';
export interface User {
    id:string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  image: string;
  products: Product[];
}