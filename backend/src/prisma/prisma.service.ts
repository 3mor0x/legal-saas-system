import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: "mongodb+srv://amrothman154_db_user:Legal123456@cluster0.c7tufjz.mongodb.net/legal_saas_db?retryWrites=true&w=majority&appName=Cluster0&authSource=admin",
        },
      },
    });
  }

  async onModuleInit() {
    try {
      console.log('--- ATTEMPTING CONNECTION ---');
      await this.$connect();
      console.log('✅ Connected to MongoDB successfully!');
    } catch (error: any) {
      console.error('❌ FAILED CONNECTION. Error:', error.message);
    }
  }
}