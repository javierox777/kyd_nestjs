import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

//mongodb
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Companys, CompanyDocument } from './models/company.model'

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Companys.name) private companyModel: Model<CompanyDocument>) { }

  async create(createCompanyDto: CreateCompanyDto) {
    const { name, email, address, rut, city, faena, contract_number, password } = createCompanyDto
    const existUser = await this.companyModel.findOne({ email: email })
    if (existUser) {
      return 'email alredy exists'
    }

    if (password.length <= 7) {
      return 'se requiere que la password tenga un minimo de 8 caracteres'
    }

    const newCampany = new this.companyModel({ name, email, address, rut, city, faena, contract_number, password })
    newCampany.password = await bcrypt.hash(password, 10)
    await newCampany.save()
    return {
      message: 'ok',
      body: newCampany
    }

  }

  async findAll() {
    try {
      const data = await this.companyModel.find()
      return data;

    } catch (error) {
      return error

    }

  }

  async findOne(id: string) {
    try {
      const data = await this.companyModel.findOne({ _id: id })
      return data;
    } catch (error) {
      return error
    }

  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      const { name, email, address, rut, city, faena, contract_number, password } = updateCompanyDto
    
      const data = await this.companyModel.findOneAndUpdate({ _id: id }, {
        name, email, address, rut, city, faena, contract_number, password

      }, { new: true })
      return data

    } catch (error) {
      return error

    }
  }

  async remove(id: string) {
    try {
      await this.companyModel.findByIdAndDelete({ _id: id })
      let data= {'message': 'company deleted'}
      return data

    } catch (error) {
      return error

    }
  }
}
