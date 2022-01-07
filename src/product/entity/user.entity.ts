import { Exclude } from 'class-transformer';

class productResponseDto {
  name: string;

  price: number;
}

export class UserEntity {
  id: number;
  name: string;
  age: number;

  @Exclude()
  pw: string;

  product: productResponseDto;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
