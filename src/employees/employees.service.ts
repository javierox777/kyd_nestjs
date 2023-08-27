import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './models/employees.model'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EmployeesService {

  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) { }
  async create(createEmployeeDto: CreateEmployeeDto) {
    const { name,
      rut,
      age,
      scholarship,
      post,
      id_faena,
      driver_license,
      valid_driver_license } = createEmployeeDto

    const existRut = await this.employeeModel.findOne({ rut: rut })
    if (existRut) {
      return "this rut already exists, plys you neet delete users for creead here"
    }

    const newEmployee = new this.employeeModel({
      name,
      rut,
      age,
      scholarship,
      post,
      id_faena,
      driver_license,
      valid_driver_license
    })
    await newEmployee.save()

    return "employee created"

  }

  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
