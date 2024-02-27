import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API Status Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Project management backend server status',
  })
  @Get()
  getStatus(): string {
    return this.appService.status();
  }
}
