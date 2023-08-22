import { Injectable, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import {generartokenActivacion} from '../helper/generatetoken-activate'



import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
//mongodb
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Users, UsersDocument} from './models/user.model'


@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}
  
 async create(CreateUserDto : CreateUserDto) {
  const {email, password }= CreateUserDto
       const existUser = await this.usersModel.findOne({email:email})
      if(existUser) {
         return 'email alredy exists'
       }

      if(password.length <= 7){
        return 'se requiere que la password tenga un minimo de 8 caracteres'
      } 
     
  const newUser =  new this.usersModel({email, password})
  newUser.confirm = generartokenActivacion()
  newUser.password = await bcrypt.hash(password, 10)
    await newUser.save() 
     const token =jwt.sign({_id:newUser._id}, "algo")
  return {
    message:'ok', 
    token:token,
    body:newUser
  }
  
  }

 async signIn(CreateUserDto : CreateUserDto){
    const {email, password}= CreateUserDto 
    const existUser = await this.usersModel.findOne({email:email})
    if(!existUser){
      return {
        message:"email o password incorrect"
      }
    }
    // if(!existUser.default) {
    //   return 'tu cuenta no ha sido confirmada'
    // }

    const match = await bcrypt.compare(password, existUser.password) 
    if(match){
      const token = jwt.sign({_id:existUser._id}, 'algo')
      return {
        message:"success",
        token:token,
        body:existUser.name
      }
    }
    return{
      message:"email o password incorrect"
    }

  }

 async findAll() {
    const data =await this.usersModel.find()
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
//esta funcion desta encargada de confirmar  el usuario por un token de un solo uso
 async confirmToken(token: string) {
    const usuarioConfirmado = await this.usersModel.findOne({confirm:token})

    if(!usuarioConfirmado){
      return {
        message:'token no valido'
      }
 }
      try {
       usuarioConfirmado.default = true
       usuarioConfirmado.confirm = ''
      await usuarioConfirmado.save()
      } catch (error) {
        console.log(error)
      }
   

    
    return {
      message:"user confirmed successfully"
    };
  }



//reset password
async resetPass(id: string, updateUserDto: UpdateUserDto) {
  const {email} = updateUserDto
  const existUser = await this.usersModel.findOne({email:email})
  if(!existUser) {
     return 'user not exists'
   }
  return `This action updates a #${existUser} user`;
}


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}