import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { TestService } from './test.service';

describe('TestController', () => {
  let controller: TestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [TestService],
    }).compile();

    controller = module.get<TestController>(TestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('test/:testId', () => {
    it('should return `Hello Test testId`', async () => {
      const testId = 1;
      expect(await controller.testFunc(testId)).toBe(`Hello Test ${testId}`);
      expect(typeof (await controller.testFunc(testId))).toBe('string');
    });
  });
});
