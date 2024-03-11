import { Module } from '@nestjs/common';
import { ProjectController } from 'src/controllers/project/project.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ProjectService } from 'src/services/project/project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService],
})
export class ProjectModule {}
