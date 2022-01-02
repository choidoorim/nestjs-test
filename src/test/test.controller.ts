import { Controller, Get, Param } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {
    this.testService = testService;
  }

  @Get(':testId')
  async testFunc(@Param('testId') testId: number): Promise<string> {
    return this.testService.testService(testId);
  }
}
