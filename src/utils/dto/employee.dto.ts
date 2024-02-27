import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: number;
}
