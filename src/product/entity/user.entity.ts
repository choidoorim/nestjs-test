import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  name: string;
  age: number;

  @Exclude()
  pw: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
