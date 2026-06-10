import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('sessions')
@UseGuards(AuthGuard, RolesGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @Roles(Role.OFFICE_OWNER, Role.LAWYER, Role.SECRETARY) 
  create(@Body() createSessionDto: any) {
    return this.sessionsService.create(createSessionDto);
  }

  // API عشان نجيب كل الجلسات الخاصة بقضية معينة
  @Get('case/:caseId')
  @Roles(Role.OFFICE_OWNER, Role.LAWYER, Role.SECRETARY)
  findByCase(@Param('caseId') caseId: string) {
    return this.sessionsService.findByCase(caseId);
  }
}