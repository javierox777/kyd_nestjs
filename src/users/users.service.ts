import { Injectable, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { generartokenActivacion } from '../helper/generatetoken-activate'

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
//mongodb
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './models/user.model'
import { ObjectUnsubscribedError } from 'rxjs';
import { SignInDto } from './dto/signin-user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) { }

  async create(CreateUserDto: CreateUserDto) {
    const { email, password, userName, rol } = CreateUserDto
    const existUser = await this.usersModel.findOne({ email: email })
    if (existUser) {
      return 'email alredy exists'
    }

    if (password.length <= 7) {
      return 'se requiere que la password tenga un minimo de 8 caracteres'
    }

    const newUser = new this.usersModel({ email, password, userName, rol })
    newUser.confirm = generartokenActivacion()
    newUser.password = await bcrypt.hash(password, 10)
    await newUser.save()
    // const token = jwt.sign({ _id: newUser._id }, "algo")
    newUser.password = undefined
    return {
      message: 'ok',
      body: newUser
    }

  }

  async signIn(SignInDto: SignInDto) {
    try {
      const { email, password } = SignInDto
      const existUser = await this.usersModel.findOne({ email: email })
      if (!existUser) {
        return {
          message: "email o password incorrect"
        }
      }
      // if(!existUser.default) {
      //   return 'tu cuenta no ha sido confirmada'
      // }

      const match = await bcrypt.compare(password, existUser.password)
      if (match) {
        const token = jwt.sign({ _id: existUser._id }, 'algo')
        existUser.password = undefined
        return {
          message: "success",
          token: token,
          userName: existUser.userName,
          email:existUser.email,
          rol:existUser.rol
        }
      }
      return {
        message: "email o password incorrect"
      }

    } catch (error) {
      return { "message": error }
    }

  }

  async findAll() {
    try {
      const data = await this.usersModel.find()
      return data;
    } catch (error) {
      return error
    }

  }
  //buscar por id
  async findOne(id: string) {

    try {
      const data = await this.usersModel.findById({ _id: id })
      return data
    } catch (error) {
      return error

    }

  }
  //esta funcion desta encargada de confirmar  el usuario por un token de un solo uso
  async confirmToken(token: string) {
    const usuarioConfirmado = await this.usersModel.findOne({ confirm: token })

    if (!usuarioConfirmado) {
      return {
        message: 'token no valido'
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
      message: "user confirmed successfully"
    };
  }



  //reset password
  async resetPass(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { email, password } = updateUserDto
      const existUser = await this.usersModel.findOne({ email: email })
      if (!existUser) {
        return 'user not exists'
      }

      await this.usersModel.findOneAndUpdate({ _id: id }, {
        password
      })
      return `reset password ok`;
    } catch (error) {
      return error

    }

  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { email, password } = updateUserDto
      const data = await this.usersModel.findOneAndUpdate({ _id: id }, {
        email, password
      }, { new: true })
      return data

    } catch (error) {
      return error
    }

  }

  async remove(id: string) {
    try {
      await this.usersModel.findOneAndDelete({ _id: id })
      return "user is remuved"
    } catch (error) {
      return error
    }

  }
}