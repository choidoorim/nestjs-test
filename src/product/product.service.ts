import { HttpService } from '@nestjs/axios';
import { Dependencies, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { Product } from './type/product.interface';

@Injectable()
@Dependencies(HttpService)
export class ProductService {
  constructor(private httpService: HttpService) {}
  private readonly product: Product[] = [];

  createProduct = async (product: Product): Promise<Product[]> => {
    this.product.push(product);
    return this.product;
  };

  findProductById = async (id: number) => {
    return this.product.find((proudct) => proudct.id === id);
  };

  axiosTest = async (): Promise<Observable<AxiosResponse<any[]>>> => {
    const result = await this.httpService
      .get('http://localhost:3000/product/detail')
      .toPromise()
      .then((res) => res.data)
      .catch((err) => console.log(err));
    console.log(result);
    return result;
  };
}
