import { IsEmail, MinLength, isString } from 'class-validator';
import { IsNumber, IsString } from "class-validator"
export class CreateUserDto {
  @IsString()
  userName: string;
  @IsString()
  rol: string;
  @IsEmail()
  email: string;
  @MinLength(5)
  password: string;
}