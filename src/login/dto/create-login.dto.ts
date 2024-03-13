import { ApiProperty } from '@nestjs/swagger';

export class CreateLoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
