import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 👈 ده عشان نخلي مجلد uploads متاح للعامة
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
 app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });

  // 2. إعدادات Swagger (توثيق الـ APIs)
  const config = new DocumentBuilder()
    .setTitle('نظام إدارة مكاتب المحاماة (Legal SaaS)')
    .setDescription('التوثيق الشامل لجميع الواجهات البرمجية (APIs) الخاصة بالنظام - نسخة المحترفين')
    .setVersion('1.0')
    .addBearerAuth() // 🛡️ عشان نقدر نحط التوكن ونجرب الـ APIs المحمية من المتصفح
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  // 3. تحديد مسار صفحة التوثيق (هتكون على الرابط /api)
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);;
}
bootstrap();