import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { LoginModule } from './modules/login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN_EXPIRY, TOKEN_SECRET } from './common/constants';
import { JwtStrategy } from './utils/strategies/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    EmployeeModule,
    ProjectModule,
    LoginModule,
    JwtModule.register({
      global: true,
      secret: TOKEN_SECRET.accessToken,
      signOptions: { expiresIn: TOKEN_EXPIRY.accessToken },
    }),
    MulterModule.register({ dest: './file' }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
