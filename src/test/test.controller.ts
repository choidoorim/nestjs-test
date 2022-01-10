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

  @Get()
  async docsTest() {
    return await this.testService.Docs({
      summary: '휴대전화로 고객 확인 or 로그인',
      description: '요약',
      createdRes: {
        description: '휴대전화로 고객 확인 or 로그인 성공',
      },
    });
  }
}
