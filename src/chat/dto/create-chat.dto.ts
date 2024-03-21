import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  sender: string;
}
