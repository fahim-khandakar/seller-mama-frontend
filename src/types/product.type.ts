import { ICategory } from './category.type';
import { IMainCategory } from './mainCategory.type';
import { IType } from './type.type';

export interface IProduct {
  _id?: string;
  name: string;
  description?: string[];
  details?: string;
  images?: string[];
  basePrice: number;
  discountPrice?: number;
  totalStock: number;
  isActive: boolean;
  createdBy: string;
  type: IType;
  category: ICategory;
  mainCategory: IMainCategory;
  mainCategorySlug: string;
  categorySlug: string;
  typeSlug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICartItem {
  cartKey: string;
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  customizedName?: string;
  customizedNumber?: string;
}
