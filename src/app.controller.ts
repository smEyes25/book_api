import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
  login(@Body() body): object {
    return this.authService.login(JSON.parse(body));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@Req() req) {
    // console.log(req);
    return req.user;
  }
}
