import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeService } from 'src/services/employee/employee.service';
import { CreateEmployeeDto } from 'src/utils/dto/employee.dto';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Get('/')
  getEmployeeDetails() {
    return this.employeeService.getEmployeeDetails();
  }

  @Post('/')
  async createEmolyee(@Body() employeeData: CreateEmployeeDto) {
    return this.employeeService.CreateEmployee(employeeData);
  }

  @Get('/:id')
  getEmployeeDetailsById(@Param('id') id: string) {
    return this.employeeService.getEmployeeDetailsById(id);
  }

  @Delete('/:id')
  deleteEmployeeById(@Param('id') id: string) {
    return this.employeeService.deleteEmployeeById(id);
  }

  @Patch('/:id')
  updateEmployeeById(
    @Param('id') id: string,
    @Body() employeeData: CreateEmployeeDto,
  ) {
    return this.employeeService.updateEmployeeById(id, employeeData);
  }
}
