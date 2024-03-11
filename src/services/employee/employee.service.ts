import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, EmployeeDto } from 'src/utils/dto/employee.dto';
import {
  BCRYPT_SALT_ROUNDS,
  RESPONSE_MESSAGE,
  TABLE,
} from 'src/common/constants';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}
  async getEmployeeDetails() {
    try {
      const employeeDetail = await this.prisma.findMany(TABLE.EMPLOYEE, {});
      return {
        status: HttpStatus.OK,
        data: employeeDetail?.map((emp) => new EmployeeDto(emp)),
      };
    } catch {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_EMPLOYEE,
      });
    }
  }

  async CreateEmployee(employeeData: CreateEmployeeDto) {
    const empId = employeeData?.employeeId;
    const empPhoneNumber = employeeData?.phoneNumber;
    const email = employeeData?.email;
    const isEmployeeIdExists = await this.prisma.findUnique(TABLE.EMPLOYEE, {
      where: { employeeId: empId },
    });
    const isEmailExists = await this.prisma.findUnique(TABLE.EMPLOYEE, {
      where: { email },
    });
    const isPhoneNumberExists = await this.prisma.findUnique(TABLE.EMPLOYEE, {
      where: { phoneNumber: empPhoneNumber },
    });
    const hashedPassword = await bcrypt.hash(
      employeeData?.password,
      BCRYPT_SALT_ROUNDS,
    );
    const payload = {
      name: employeeData?.name,
      employeeId: employeeData?.employeeId,
      email: employeeData?.email,
      phoneNumber: employeeData?.phoneNumber,
      password: hashedPassword,
    };
    if (!isEmployeeIdExists && !isEmailExists && !isPhoneNumberExists) {
      try {
        const employeeDetail = await this.prisma.create(
          TABLE.EMPLOYEE,
          payload,
        );
        return {
          status: HttpStatus.OK,
          data: new EmployeeDto(employeeDetail),
          message: 'Employee Created',
        };
      } catch (err) {
        throw new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create Employee',
        });
      }
    } else {
      if (isEmployeeIdExists) {
        throw new ConflictException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Employee already exists',
        });
      }
      if (isEmailExists) {
        throw new ConflictException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Email already exists',
        });
      }
      if (isPhoneNumberExists) {
        throw new ConflictException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Phone number already exists',
        });
      }
    }
  }

  async getEmployeeDetailsById(id: string) {
    try {
      const employeeDetail = await this.prisma.findUnique(TABLE.EMPLOYEE, {
        where: { id },
      });
      if (employeeDetail) {
        return {
          status: HttpStatus.OK,
          data: new EmployeeDto(employeeDetail),
        };
      } else {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: RESPONSE_MESSAGE.EMPLOYEE_NOT_FOUND,
        });
      }
    } catch {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_EMPLOYEE,
      });
    }
  }

  async deleteEmployeeById(id: string) {
    try {
      const employeeDetail = await this.prisma.delete(TABLE.EMPLOYEE, {
        where: { id },
      });
      if (employeeDetail) {
        return {
          status: HttpStatus.OK,
          message: 'Deleted Successfully',
        };
      } else {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: RESPONSE_MESSAGE.EMPLOYEE_NOT_FOUND,
        });
      }
    } catch {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_EMPLOYEE,
      });
    }
  }

  async updateEmployeeById(id: string, data: CreateEmployeeDto) {
    const payload: any = { ...data };
    delete payload?.id;
    try {
      const employeeDetail = await this.prisma.update(TABLE.EMPLOYEE, {
        where: { id },
        data: payload,
      });
      if (employeeDetail) {
        return {
          status: HttpStatus.OK,
          message: 'Updated Successfully',
        };
      } else {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: RESPONSE_MESSAGE.EMPLOYEE_NOT_FOUND,
        });
      }
    } catch {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_EMPLOYEE,
      });
    }
  }
}
