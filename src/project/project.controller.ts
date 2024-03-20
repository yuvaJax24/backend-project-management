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
import { RolesGuard } from 'src/utils/gaurd/roles.gaurd';
import { ROLE } from 'src/common/enum';
import { Roles } from 'src/decorator/roles.decorator';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  @ApiBearerAuth('access-token')
  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(JwtAuthGaurd, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getProjectDetails() {
    return this.projectService.getProjectDetails();
  }

  @Post()
  @ApiBearerAuth('access-token')
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGaurd, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async addProject(@Body() projectData: CreateProjectDto) {
    return this.projectService.addProject(projectData);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(JwtAuthGaurd, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getProjectDetailsById(@Param('id') id: string) {
    return this.projectService.getProjectDetailsById(id);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGaurd, RolesGuard)
  deleteProjectById(@Param('id') id: string) {
    return this.projectService.deleteProjectById(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGaurd, RolesGuard)
  updateProjectById(
    @Param('id') id: string,
    @Body() projectData: CreateProjectDto,
  ) {
    return this.projectService.updateProjectById(id, projectData);
  }
}
