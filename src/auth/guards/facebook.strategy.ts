import { AppConfigService } from '#config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { FacebookUser } from '../types';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: AppConfigService) {
    super({
      clientID: configService.facebookCredentials.id,
      clientSecret: configService.facebookCredentials.secret,
      callbackURL: 'http://localhost:3000/auth/facebook/redirect',
      scope: ['email', 'user_birthday', 'user_gender'],
      profileFields: ['name', 'emails', 'birthday', 'gender'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): void {
    const { id, name, emails, gender, _json } = profile;

    let user: FacebookUser | null = null;

    if (name && _json.birthday) {
      user = {
        id,
        email: emails?.[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        birthday: _json.birthday,
        gender,
      };

      done(null, user);
    }

    done(new UnauthorizedException('No sufficient permissions'), null);
  }
}
