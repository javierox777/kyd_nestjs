import { IsEmail, IsOptional, MinLength, isString } from 'class-validator';
import { IsNumber, IsString } from "class-validator"
export class CreateUserDto {
  @IsOptional()
  @IsString()
  userName?: string;
  @IsOptional()
  @IsString()
  rol?: string;
  @IsEmail()
  email: string;
  @MinLength(5)
  password: string;
}