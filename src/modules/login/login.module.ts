import { Module } from '@nestjs/common';
import { LoginController } from 'src/controllers/login/login.controller';
import { LoginServices } from 'src/services/login/login.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [LoginController],
  providers: [LoginServices, PrismaService],
})
export class LoginModule {}
