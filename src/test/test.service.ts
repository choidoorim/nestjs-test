import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  async testService(testId: number) {
    return `Hello Test ${testId}`;
  }
}
