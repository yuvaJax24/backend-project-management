import { ApiProperty } from '@nestjs/swagger';
export class CreateProjectDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  employeeId: string[];
}

export class ProjectDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  employeeId: string[];

  constructor(partial: Partial<ProjectDto>) {
    Object.assign(this, partial);
  }
}
