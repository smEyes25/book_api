import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './common/guards/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './common/guards/local/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  async register(@Req() req) {
    req.body.role_name = 'USER';
    const isRegisted = await this.appService.register(req.body);
    if (!isRegisted)
      throw new HttpException('Register failed', HttpStatus.BAD_REQUEST);

    return true;
  }

  @Post('/register-admin-account')
  async registerAdmin(@Req() req) {
    req.body.role_name = 'ADMIN';
    const isRegisted = await this.appService.register(req.body);
    if (!isRegisted)
      throw new HttpException('Register failed', HttpStatus.BAD_REQUEST);

    return true;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req): Promise<any> {
    return await this.appService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello() {
    return 'Logged with Bearer token';
  }
}
