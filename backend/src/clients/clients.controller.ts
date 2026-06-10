import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('clients')
@UseGuards(AuthGuard, RolesGuard) // 🛡️ ركبنا حارس الدخول وحارس الصلاحيات على الموديول كله
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @Roles(Role.OFFICE_OWNER, Role.LAWYER) // 🛑 إضافة الموكل مسموحة للمدير والمحامي فقط
  create(@Body() createClientDto: any, @Req() req: any) {
    // req.user جواه بيانات الشخص اللي عامل لوجين (بنجيبها من التوكن)
    // مؤقتاً هنعتبر الـ id بتاع اليوزر هو الـ officeId عشان نربط الموكل بمكتبه
    const officeId = req.user.sub; 
    return this.clientsService.create({ ...createClientDto, officeId });
  }

  @Get()
  @Roles(Role.OFFICE_OWNER, Role.LAWYER, Role.SECRETARY) // 🛑 السكرتارية مسموح ليها تشوف قائمة الموكلين
  findAll() {
    return this.clientsService.findAll();
  }
}