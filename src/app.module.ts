import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useExisting: AppConfigService,
    }),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
