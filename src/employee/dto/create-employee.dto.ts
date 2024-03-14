import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateEmployeeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  projectId?: string[];

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  role: string;
}

export class EmployeeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  projectId?: string[];

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  role: string;

  constructor(partial: Partial<EmployeeDto>) {
    Object.assign(this, partial);
  }
}
