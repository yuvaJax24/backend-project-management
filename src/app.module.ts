import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN_EXPIRY, TOKEN_SECRET } from './common/constants';
import { JwtStrategy } from './utils/strategies/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { ProjectModule } from './project/project.module';
import { EmployeeModule } from './employee/employee.module';
import { LoginModule } from './login/login.module';
import { PrismaService } from './prisma/prisma.service';
import { ReportModule } from './report/report.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    LoginModule,
    EmployeeModule,
    ProjectModule,
    ReportModule,
    ChatModule,
    JwtModule.register({
      global: true,
      secret: TOKEN_SECRET.accessToken,
      signOptions: { expiresIn: TOKEN_EXPIRY.accessToken },
    }),
    MulterModule.register({ dest: './file' }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, PrismaService],
})
export class AppModule {}
