import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async findMany(tablename: string, query: object) {
    try {
      return await this[tablename].findMany(query);
    } catch (error: any) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(tablename: string, data: object) {
    try {
      return await this[tablename].create({
        data: data,
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error);
    }
  }

  async findUnique(tablename: string, query: object) {
    try {
      return await this[tablename].findUnique(query);
    } catch (error: any) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(tablename: string, query: object) {
    try {
      return await this[tablename].delete(query);
    } catch (error: any) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(tablename: string, queryandData: object) {
    try {
      return await this[tablename].update(queryandData);
    } catch (error: any) {
      throw new InternalServerErrorException(error);
    }
  }
}
