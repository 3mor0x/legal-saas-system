import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { CasesModule } from './cases/cases.module';
import { SessionsModule } from './sessions/sessions.module';
import { InvoicesModule } from './invoices/invoices.module';
import { DocumentsModule } from './documents/documents.module';
import { ChatModule } from './chat/chat.module'; // 👈 استيراد موديول الشات الجديد

// 1. استيراد المكتبات دي
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ClientsModule,
    CasesModule,
    SessionsModule,
    InvoicesModule,
    DocumentsModule,
    ChatModule, // 👈 تفعيل محطة الشات في السيستم
    
    // 2. تفعيل عرض الملفات من فولدر uploads
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}