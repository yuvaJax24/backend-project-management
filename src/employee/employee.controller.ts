import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ROLE } from 'src/common/enum';
import { Roles } from 'src/decorator/roles.decorator';
import { JwtAuthGaurd } from 'src/utils/gaurd/jwt.gaurd';
import { RolesGuard } from 'src/utils/gaurd/roles.gaurd';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Get()
  @ApiBearerAuth('access-token')
  // @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGaurd)
  @UseInterceptors(ClassSerializerInterceptor)
  getEmployeeDetails() {
    return this.employeeService.getEmployeeDetails();
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGaurd)
  @UseInterceptors(ClassSerializerInterceptor)
  async createEmolyee(@Body() employeeData: CreateEmployeeDto) {
    return this.employeeService.CreateEmployee(employeeData);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGaurd)
  @UseInterceptors(ClassSerializerInterceptor)
  getEmployeeDetailsById(@Param('id') id: string) {
    return this.employeeService.getEmployeeDetailsById(id);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGaurd)
  deleteEmployeeById(@Param('id') id: string) {
    return this.employeeService.deleteEmployeeById(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGaurd)
  updateEmployeeById(
    @Param('id') id: string,
    @Body() employeeData: CreateEmployeeDto,
  ) {
    return this.employeeService.updateEmployeeById(id, employeeData);
  }
}
