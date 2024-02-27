import { Module } from '@nestjs/common';
import { EmployeeController } from 'src/controllers/employee/employee.controller';
import { EmployeeService } from 'src/services/employee/employee.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
})
export class EmployeeModule {}
