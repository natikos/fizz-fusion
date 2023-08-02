import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationResponseDto, AppSignUp } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/sign-up')
  async appSignUp(@Body() dto: AppSignUp): Promise<AuthenticationResponseDto> {
    return await this.service.appSignUp(dto);
  }
}
