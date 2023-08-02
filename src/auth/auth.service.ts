import { AppConfigService } from '#config';
import { User } from '#user/models';
import { generateToken } from '#utils';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { AppSignUp, AuthenticationResponseDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly user: Model<User>,
    private readonly configService: AppConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async appSignUp(userData: AppSignUp): Promise<AuthenticationResponseDto> {
    const password = await this.hashPassword(userData.password);
    const { _id } = await this.user.create({
      ...userData,
      password,
    });
    const tokens = await this.generateTokens({ id: _id });
    // TODO: store refresh token in Redis
    // TODO: Send email confirmation
    return tokens;
  }

  private async generateTokens(
    payload: Record<string, string>,
  ): Promise<AuthenticationResponseDto> {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = generateToken(32);
    return { accessToken, refreshToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.configService.auth.saltRounds);
    const hashedPassword = hash(password, salt);
    return hashedPassword;
  }
}
