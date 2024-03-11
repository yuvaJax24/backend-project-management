import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginServices } from 'src/services/login/login.service';
import { LoginDto } from 'src/utils/dto/employee.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginServices) {}

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginData: LoginDto) {
    return await this.loginService.login(loginData);
  }
}
