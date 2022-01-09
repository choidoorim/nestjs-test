import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  testService = async (testId: number) => {
    return `Hello Test ${testId}`;
  }
}
