import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('invoices')
@UseGuards(AuthGuard, RolesGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @Roles(Role.OFFICE_OWNER, Role.SECRETARY) // إضافة الفواتير للمدير والسكرتارية
  create(@Body() createInvoiceDto: any) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  @Roles(Role.OFFICE_OWNER, Role.SECRETARY, Role.LAWYER) // الكل يقدر يشوف الفواتير
  findAll(@Req() req: any) {
    const officeId = req.user.sub; // هنجيب فواتير المكتب ده بس
    return this.invoicesService.findAll(officeId);
  }
}