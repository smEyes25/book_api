import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  Options,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './common/guards/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './common/guards/local/local-auth.guard';
import { Account } from './models/account/entities/account';
import { User } from './models/user/entities/user';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post('/test')
  test(@Req() req) {
    console.log(req.body);
  }

  @Post('/create-account')
  async create(@Body() body): Promise<boolean> {
    const user = new User();
    user.full_name = body.full_name;
    user.address = body.address;
    user.email = body.email;
    user.phone_number = body.phone_number;

    const account = new Account();
    account.username = body.username;
    account.password = body.password;
    account.status = body.status;

    const roleId: string = body.role_id;

    const result = await this.appService.createAccount(account, user, roleId);
    if (result) return true;
    return false;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<object> {
    // console.log(req);
    return await this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@Request() req) {
    return req.user;
  }

  @Get('/test1')
  test1() {
    return { test: 'hello' };
  }

  @Options('/login')
  optionsLogin(@Res() res) {
    return HttpStatus.OK;
  }
}
