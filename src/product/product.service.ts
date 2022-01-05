import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductService {
  private readonly product: Product[] = [];

  createProduct = async (product: Product): Promise<Product[]> => {
    this.product.push(product);
    return this.product;
  };

  findProductById = async (id: number) => {
    for (const product of this.product) {
      if (product.id == id) {
        return product;
      }
    }
  };
}
