import { Exclude, Expose } from 'class-transformer';

class productResponseDto {
  name: string;

  price: number;
}

export class UserResponseDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _age: number;
  @Exclude() private readonly _pw: string;

  constructor(user: { name: string; pw: string; id: number; age: number }) {
    this._id = user.id;
    this._name = user.name;
    this._age = user.age;
    this._pw = user.pw;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get age(): number {
    return this._age;
  }

  get pw(): string {
    return this._pw;
  }
}
