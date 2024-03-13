import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { JwtAuthGaurd } from 'src/utils/gaurd/jwt.gaurd';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGaurd)
  @UseInterceptors(ClassSerializerInterceptor)
  getProjectDetails() {
    return this.projectService.getProjectDetails();
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGaurd)
  @UseInterceptors(ClassSerializerInterceptor)
  async addProject(@Body() projectData: CreateProjectDto) {
    return this.projectService.addProject(projectData);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGaurd)
  @UseInterceptors(ClassSerializerInterceptor)
  getProjectDetailsById(@Param('id') id: string) {
    return this.projectService.getProjectDetailsById(id);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGaurd)
  deleteProjectById(@Param('id') id: string) {
    return this.projectService.deleteProjectById(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGaurd)
  updateProjectById(
    @Param('id') id: string,
    @Body() projectData: CreateProjectDto,
  ) {
    return this.projectService.updateProjectById(id, projectData);
  }
}
