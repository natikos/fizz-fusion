import { Environment } from '#common/types';
import { generateToken } from '#utils';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { AuthVariables, FacebookCredentials } from './interfaces';

@Injectable()
export class AppConfigService
  implements MongooseOptionsFactory, JwtOptionsFactory
{
  private readonly JWT_EXPIRES_IN = 5;

  constructor(private readonly envService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const uri = this.envService.getOrThrow<string>('MONGODB_CONNECTION');
    return { uri };
  }

  createJwtOptions(): JwtModuleOptions {
    const tokenLength = this.envService.getOrThrow('JWT_SECRET_LENGTH');

    return {
      secretOrKeyProvider: () => generateToken(tokenLength),
      signOptions: {
        expiresIn:
          this.environment === 'production'
            ? `${this.JWT_EXPIRES_IN}m`
            : `${this.JWT_EXPIRES_IN}h`,
      },
    };
  }

  get auth(): AuthVariables {
    const saltRounds = +this.envService.getOrThrow('SALT_ROUNDS');
    return { saltRounds };
  }

  get environment(): Environment {
    return this.envService.getOrThrow('NODE_ENV');
  }

  get facebookCredentials(): FacebookCredentials {
    const id = this.envService.getOrThrow('FACEBOOK_APP_ID');
    const secret = this.envService.getOrThrow('FACEBOOK_APP_SECRET');
    return { id, secret };
  }
}
