import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { startOfDay } from 'date-fns';
import { IsAdult } from '../validators';

export class AppSignUp {
  @IsString()
  @Length(5, 15)
  username: string;

  @IsEmail()
  email: string;

  @IsDate()
  @IsAdult()
  @Transform(({ value }) => startOfDay(new Date(value)))
  birthDate: Date;

  @IsStrongPassword()
  password: string;
}
