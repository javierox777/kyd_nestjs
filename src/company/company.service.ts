import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

//mongodb
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Companys, CompanyDocument} from './models/company.model'

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Companys.name) private companyModel: Model<CompanyDocument>) {}

  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }

  async findAll() {
    const data = await this.companyModel.find()
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
