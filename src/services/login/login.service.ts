import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeDto, LoginDto } from 'src/utils/dto/employee.dto';
import { TABLE, TOKEN_EXPIRY, TOKEN_SECRET } from 'src/common/constants';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginServices {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async login(loginData: LoginDto) {
    const email = loginData?.email;
    const password = loginData?.password;
    const isEmailExists = await this.prisma.findUnique(TABLE.EMPLOYEE, {
      where: { email },
    });
    const accessToken = this.jwtService.sign(
      { payload: loginData },
      {
        expiresIn: TOKEN_EXPIRY.accessToken,
        privateKey: TOKEN_SECRET.accessToken,
      },
    );
    if (!isEmailExists) {
      throw new NotFoundException({
        message: "Employee doesn't exists",
      });
    }
    if (isEmailExists) {
      const isPasswordMatching = await bcrypt.compare(
        password,
        isEmailExists?.password,
      );
      if (isPasswordMatching) {
        return {
          status: HttpStatus.ACCEPTED,
          response: new EmployeeDto({
            ...isEmailExists,
            accessTokken: accessToken,
          }),
          message: 'Logged in successfully',
        };
      }
      throw new BadRequestException({
        message: 'Incorrect password',
      });
    }
  }
}
