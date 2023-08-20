import { User } from '#common/decorators';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AppLogInDto, AppSignUpDto, AuthenticationResponseDto } from './dto';
import { FacebookUser } from './types';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signup')
  async appSignUp(
    @Body() dto: AppSignUpDto,
  ): Promise<AuthenticationResponseDto> {
    return await this.service.appSignUp(dto);
  }

  @Post('/login')
  async appLogIn(@Body() dto: AppLogInDto): Promise<AuthenticationResponseDto> {
    return await this.service.appLogIn(dto);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(): Promise<void> {
    return;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(
    @User() user: FacebookUser,
  ): Promise<AuthenticationResponseDto> {
    return await this.service.facebookAuth(user);
  }
}
