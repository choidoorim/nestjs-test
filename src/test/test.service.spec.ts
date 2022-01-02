import { Test, TestingModule } from '@nestjs/testing';
import { TestService } from './test.service';

describe('TestService', () => {
  let service: TestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestService],
    }).compile();

    service = module.get<TestService>(TestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('test/:testId', () => {
    it('should return `Hello Test testId`', async () => {
      const testId = 1;
      expect(await service.testService(testId)).toBe(`Hello Test ${testId}`);
    });
  });
});
