import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginServices } from './login.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LoginController],
  providers: [LoginServices, PrismaService],
})
export class LoginModule {}
