import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AccountService } from './account.service';

@Controller('/admin/account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getAll(): Promise<any> {
    return await this.accountService.findAll();
  }

  @Get('/:id')
  async getById(@Param() param): Promise<any> {
    const account = await this.accountService.findById(param.id);
    if (!account) {
      throw new HttpException('No account found', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.findById(account.user_id);

    return {
      account,
      user,
    };
  }

  @Post()
  async create(@Req() req: any): Promise<any> {
    req.body.role_name = 'USER';
    const isCreated = this.accountService.create(req.body);
    if (!isCreated)
      throw new HttpException('Create account failed', HttpStatus.BAD_REQUEST);

    return true;
  }

  @Post('/create-admin-account')
  async createAdminAccount(@Req() req: any): Promise<any> {
    req.body.role_name = 'ADMIN';
    const isCreated = this.accountService.create(req.body);
    if (!isCreated)
      throw new HttpException('Create account failed', HttpStatus.BAD_REQUEST);

    return true;
  }

  @Put('/:id')
  async update(@Req() req: any, @Param() param): Promise<any> {
    const isUpdated = this.accountService.update(req.body, param.id);
    if (!isUpdated)
      throw new HttpException('Update account failed', HttpStatus.BAD_REQUEST);

    return true;
  }

  @Delete('/:id')
  async delete(@Param() param): Promise<any> {
    const isDeleted = this.accountService.delete(param.id);
    if (!isDeleted)
      throw new HttpException('Delete account failed', HttpStatus.BAD_REQUEST);

    return true;
  }
}
