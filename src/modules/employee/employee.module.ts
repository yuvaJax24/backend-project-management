import { Module } from '@nestjs/common';
import { EmployeeController } from 'src/controllers/employee/employee.controller';
import { ReportController } from 'src/controllers/report/report.controller';
import { EmployeeService } from 'src/services/employee/employee.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ReportService } from 'src/services/report/report.service';

@Module({
  controllers: [EmployeeController, ReportController],
  providers: [EmployeeService, ReportService, PrismaService],
})
export class EmployeeModule {}
