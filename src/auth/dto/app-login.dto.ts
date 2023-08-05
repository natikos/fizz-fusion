import { IsNotEmpty, IsString } from 'class-validator';

export class AppLogInDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
