import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { BillService } from './bill.service';

@Controller('/admin/bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @HttpCode(200)
  @Get()
  async getAll(): Promise<any> {
    return await this.billService.findAll();
  }

  @HttpCode(200)
  @Get('/:id')
  async getById(@Param() param): Promise<any> {
    const bill = await this.billService.findById(param.id);
    if (!bill) throw new HttpException('No bill found', HttpStatus.BAD_REQUEST);

    return true;
  }

  @HttpCode(201)
  @Post()
  async create(@Req() req): Promise<any> {
    const isCreated = await this.billService.create(req.body);
    if (!isCreated)
      throw new HttpException('Create bill failed', HttpStatus.BAD_REQUEST);

    return true;
  }

  @HttpCode(200)
  @Put('/:id')
  async update(@Req() req, @Param() param): Promise<any> {
    const isUpdated = await this.billService.update(req.body, param.id);
    if (!isUpdated)
      throw new HttpException('Update bill failed', HttpStatus.BAD_REQUEST);

    return true;
  }
}
