import { generateToken } from '#utils';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { AuthVars } from './interfaces';

@Injectable()
export class AppConfigService
  implements MongooseOptionsFactory, JwtOptionsFactory
{
  private readonly JWT_EXPIRES_IN_HOURS = 1;

  constructor(private readonly envService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const uri = this.envService.getOrThrow<string>('MONGODB_CONNECTION');
    return { uri };
  }

  createJwtOptions(): JwtModuleOptions {
    const tokenLength = this.envService.getOrThrow('JWT_SECRET_LENGTH');
    const secretOrKeyProvider: JwtModuleOptions['secretOrKeyProvider'] = (
      requestType,
      tokenOrPayload,
      options,
    ) => {
      // TODO: remove after discovering
      console.log('requestType', requestType);
      console.log('tokenOrPayload', tokenOrPayload);
      console.log('options', options);
      return generateToken(tokenLength);
    };

    return {
      secretOrKeyProvider,
      signOptions: {
        expiresIn: `${this.JWT_EXPIRES_IN_HOURS}h`,
      },
    };
  }

  get auth(): AuthVars {
    const saltRounds = +this.envService.getOrThrow('SALT_ROUNDS');
    return { saltRounds, jwtExpiresIn: this.JWT_EXPIRES_IN_HOURS };
  }
}
