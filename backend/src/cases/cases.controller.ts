import { Controller, Get, Post, Body, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { CasesService } from './cases.service';
import { AuthGuard } from '../auth/auth.guard';
// import { RolesGuard } from '../auth/roles.guard'; // تأكد إنك مكريت الملف ده
// import { Roles } from '../auth/roles.decorator';

@Controller('cases')
@UseGuards(AuthGuard) // شلت RolesGuard مؤقتاً لحد ما نتأكد إنك برمجته صح عشان ميقفلش الطريق
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  create(@Body() createCaseDto: any, @Req() req: any) {
    if (!req.user || !req.user.sub) {
       throw new UnauthorizedException('غير مصرح لك بإضافة قضايا');
    }
    // سحب الـ ID بتاع اليوزر/المكتب من الـ Token تلقائياً
    const officeId = req.user.sub; 
    return this.casesService.create({ ...createCaseDto, officeId });
  }

  @Get()
  findAll(@Req() req: any) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('غير مصرح لك بعرض القضايا');
    }
    return this.casesService.findAll(req.user.sub);
  }
}