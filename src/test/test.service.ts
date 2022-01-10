import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  testService = async (testId: number) => {
    return `Hello Test ${testId}`;
  };

  Docs = async ({ summary, description, ...res }) => {
    return res.createRes;
  };
}
