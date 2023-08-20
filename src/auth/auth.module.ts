import { UserModule } from '#user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/config/config.module';
import { AppConfigService } from 'src/config/config.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './guards';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useExisting: AppConfigService,
    }),
    AppConfigModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, FacebookStrategy],
})
export class AuthModule {}
