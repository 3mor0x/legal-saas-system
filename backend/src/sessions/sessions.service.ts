import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.session.create({
      data: {
        title: data.title,
        date: new Date(data.date), // بنحول النص اللي جاي من الـ API لتاريخ حقيقي
        courtLocation: data.courtLocation,
        decision: data.decision || null,
        caseId: data.caseId, // بنربط الجلسة برقم القضية
      },
    });
  }

  async findByCase(caseId: string) {
    return this.prisma.session.findMany({
      where: { caseId },
      orderBy: { date: 'asc' }, // بنرتب الجلسات من الأقدم للأحدث عشان المحامي يشوفها مترتبة
    });
  }
}