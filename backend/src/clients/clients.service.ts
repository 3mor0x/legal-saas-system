import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.client.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        nationalId: data.nationalId,
        address: data.address,
        officeId: data.officeId, // اتربطت تلقائي من التوكن
      },
    });
  }

  async findAll() {
    return this.prisma.client.findMany();
  }
}