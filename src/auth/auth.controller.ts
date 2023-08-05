import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppLogInDto, AppSignUpDto, AuthenticationResponseDto } from './dto';

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
}
