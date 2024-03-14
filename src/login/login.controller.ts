import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoginServices } from './login.service';
import { EmployeeService } from 'src/employee/employee.service';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginServices,
    private readonly employeeService: EmployeeService,
  ) {}

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginData: CreateLoginDto) {
    return await this.loginService.login(loginData);
  }

  @Post('/seedUser')
  @UseInterceptors(ClassSerializerInterceptor)
  async seedEmployee(@Body() seedEmpDetails: CreateEmployeeDto) {
    return await this.employeeService.CreateEmployee(seedEmpDetails);
  }
}
