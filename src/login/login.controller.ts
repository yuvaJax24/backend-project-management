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

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginServices) {}

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginData: CreateLoginDto) {
    return await this.loginService.login(loginData);
  }
}
