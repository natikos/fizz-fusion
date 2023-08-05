import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    AppConfigModule,
    CoreModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useExisting: AppConfigService,
    }),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
