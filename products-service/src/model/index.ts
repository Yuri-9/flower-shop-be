export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
};

export interface ProductPostBody {
  title: string;
  description: string;
  price: number;
  count: number;
}

export type Stock = {
  product_id: Product['id'];
  count: number;
};

export type ProductFullData = Product & Pick<Stock, 'count'>;
