import { Injectable, OnModuleInit } from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const adminEmail = 'admin@legal.com';
    const existingAdmin = await this.prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      try {
        const hashedPassword = await bcrypt.hash('123456', 10);

        await this.prisma.user.create({
          data: {
            fullName: 'Admin User',
            email: adminEmail,
            password: hashedPassword,
            role: Role.OFFICE_OWNER,
          },
        });

        console.log('Default Admin Created: admin@legal.com | Pass: 123456');
      } catch (error) {
        console.warn('Default admin was not created. Check MongoDB replica set configuration.');
        console.warn(error);
      }
    }
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
