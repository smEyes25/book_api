import { Controller, Get, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  test(): string {
    const text = this.configService.get<string>('TEST');
    return text;
  }

  @Post()
  test_post(@Req() req: any): string {
    console.log(req.body);
    // const result = JSON.parse(body);
    // console.log(result);

    // const obj: any = {
    //   result: '',
    // };
    // if (result === 'test') {
    //   obj.result = 'true';
    //   return obj;
    // } else {
    //   obj.result = 'false';
    //   return obj;
    // }

    return 'abc';
  }
}
