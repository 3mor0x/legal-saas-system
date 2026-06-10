import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [], // 👈 فضيناها لأننا مش محتاجين الكنترولر دلوقتي
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}