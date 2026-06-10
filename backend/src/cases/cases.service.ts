import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CasesService {
  constructor(private prisma: PrismaService) {}

  private generateObjectId() {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    const randomHex = 'x'.repeat(16).replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
    return timestamp + randomHex;
  }

  async create(data: any) {
    const autoCaseNumber = data.caseNumber || `CASE-${Date.now().toString().slice(-6)}`;
    
    let clientId = data.clientId;
    if (!clientId || clientId === 'new-client-id') {
      const newClient = await this.prisma.client.create({
        data: {
          id: this.generateObjectId(),
          name: data.client || 'موكل جديد',
          email: `client-${Date.now()}@test.com`,
          phone: `010${Math.floor(Math.random() * 100000000)}`,
          nationalId: Math.floor(10000000000000 + Math.random() * 90000000000000).toString(),
          officeId: data.officeId, // 👈 تم الحل هنا
        }
      });
      clientId = newClient.id;
    }

    return this.prisma.case.create({
      data: {
        title: data.title,
        caseNumber: autoCaseNumber,
        type: data.type || 'عام',
        court: data.court || 'غير محدد',
        notes: data.notes || '',
        status: 'ACTIVE',
        clientId: clientId, 
        officeId: data.officeId, 
      },
    });
  }

  async findAll(officeId: string) {
    return this.prisma.case.findMany({
      where: { officeId: officeId }, 
      include: {
        client: true, 
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}