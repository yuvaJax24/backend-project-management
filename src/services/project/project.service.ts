import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddProjectDto, ProjectDto } from 'src/utils/dto/project.dto';
import { RESPONSE_MESSAGE, TABLE } from 'src/common/constants';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async getProjectDetails() {
    try {
      const projectDetail = await this.prisma.findMany(TABLE.PROJECT, {});
      return {
        status: HttpStatus.OK,
        data: projectDetail?.map((project) => new ProjectDto(project)),
      };
    } catch {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_PROJECT,
      });
    }
  }

  async addProject(projectData: AddProjectDto) {
    try {
      const projectDetail = await this.prisma.create(
        TABLE.PROJECT,
        projectData,
      );
      return {
        status: HttpStatus.OK,
        data: new ProjectDto(projectDetail),
        message: 'Project Added',
      };
    } catch (err) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to add a project',
      });
    }
  }

  async getProjectDetailsById(id: string) {
    try {
      const projectDetail = await this.prisma.findUnique(TABLE.PROJECT, {
        where: { id },
      });
      if (projectDetail) {
        return {
          status: HttpStatus.OK,
          data: new ProjectDto(projectDetail),
        };
      } else {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: RESPONSE_MESSAGE.PROJECT_NOT_FOUND,
        });
      }
    } catch {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_PROJECT,
      });
    }
  }

  async deleteProjectById(id: string) {
    try {
      const projectDetail = await this.prisma.delete(TABLE.PROJECT, {
        where: { id },
      });
      if (projectDetail) {
        return {
          status: HttpStatus.OK,
          message: 'Deleted Successfully',
        };
      } else {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: RESPONSE_MESSAGE.PROJECT_NOT_FOUND,
        });
      }
    } catch {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_PROJECT,
      });
    }
  }

  async updateProjectById(id: string, data: AddProjectDto) {
    const payload: any = { ...data };
    delete payload?.id;
    try {
      const projectDetail = await this.prisma.update(TABLE.PROJECT, {
        where: { id },
        data: payload,
      });
      if (projectDetail) {
        return {
          status: HttpStatus.OK,
          message: 'Updated Successfully',
        };
      } else {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: RESPONSE_MESSAGE.PROJECT_NOT_FOUND,
        });
      }
    } catch {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.FAILED_TO_FETCH_PROJECT,
      });
    }
  }
}
