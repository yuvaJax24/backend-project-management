import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { ReportService } from './report.service';
import { JwtAuthGaurd } from 'src/utils/gaurd/jwt.gaurd';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}
  @Get('/employee')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGaurd)
  downloadFileTemplate(@Res({ passthrough: true }) res: Response) {
    return this.reportService.downloadFileTemplate(res);
  }

  @Post('/employee-upload')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGaurd)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.reportService.uploadFile(file);
  }
}
