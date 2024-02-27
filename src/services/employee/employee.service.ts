import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from 'src/utils/dto/employee.dto';
import { RESPONSE_MESSAGE, TABLE } from 'src/common/constants';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}
  async getEmployeeDetails() {
    try {
      const employeeDetail = await this.prisma.findMany(TABLE.EMPLOYEE, {});
      return {
        status: HttpStatus.OK,
        data: employeeDetail,
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_EMPLOYEE,
      };
    }
  }

  async CreateEmployee(employeeData: CreateEmployeeDto) {
    try {
      const employeeDetail = await this.prisma.create(
        TABLE.EMPLOYEE,
        employeeData,
      );
      return {
        status: HttpStatus.OK,
        data: employeeDetail,
        message: 'Employee Created',
      };
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create Employee',
      };
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
          data: employeeDetail,
        };
      } else {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: RESPONSE_MESSAGE.EMPLOYEE_NOT_FOUND,
        };
      }
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_EMPLOYEE,
      };
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
        return {
          status: HttpStatus.BAD_REQUEST,
          message: RESPONSE_MESSAGE.EMPLOYEE_NOT_FOUND,
        };
      }
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_EMPLOYEE,
      };
    }
  }

  async updateEmployeeById(id: string, data: CreateEmployeeDto) {
    try {
      const employeeDetail = await this.prisma.update(TABLE.EMPLOYEE, {
        where: { id: id },
        data,
      });
      if (employeeDetail) {
        return {
          status: HttpStatus.OK,
          message: 'Updated Successfully',
        };
      } else {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: RESPONSE_MESSAGE.EMPLOYEE_NOT_FOUND,
        };
      }
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_EMPLOYEE,
      };
    }
  }
}
