import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, } from 'class-validator'

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  name: string;

  @Prop()
  @IsEmail()
  email: string;

  @Prop()
  password: string;

  @Prop()
  birthday: string;

  @Prop()
  default: boolean;

  @Prop()
  confirm: string;



}

export const UsersSchema = SchemaFactory.createForClass(Users);