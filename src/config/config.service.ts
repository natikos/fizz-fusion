import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class AppConfigService implements MongooseOptionsFactory {
  constructor(private readonly envService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const uri = this.envService.getOrThrow<string>('MONGODB_CONNECTION');
    return { uri };
  }
}
