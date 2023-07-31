import { Injectable } from '@nestjs/common';
import { AppConfigService } from './config/config.service';

@Injectable()
export class AppService {
  constructor(private readonly configService: AppConfigService) {}

  getHello(): string {
    return this.configService.createMongooseOptions().uri!;
  }
}
