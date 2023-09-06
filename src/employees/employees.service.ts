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
  const { name, rut, age, scholarship, post, id_faena, driver_license, valid_driver_license } = createEmployeeDto;

  const existRut = await this.employeeModel.findOne({ rut: rut });
  if (existRut) {
    return "This RUT already exists, please delete users to create here.";
  }



  const newEmployee = new this.employeeModel({
    name,
    rut,
    age,
    scholarship,
    post,
    id_faena, // Debe ser un ObjectId válido
    driver_license,
    valid_driver_license,
  });
  
  // Añade las fechas si es necesario
  newEmployee.dateAt = new Date();
  newEmployee.dateEnd = null; // Puedes establecerlo según tus necesidades

  await newEmployee.save();
  return newEmployee;
}

  async findAll() {
    try {
      const data = await this.employeeModel.find()
      return data;
    } catch (error) {
      return error
    }

  }

 async findOne(rut: string) {
    try {
      const existRut = await this.employeeModel.findOne({ "rut": rut });
      if(existRut){
        return existRut      
      }
      return {"data":"rut no valido"}
    } catch (error) {
      return {"message":error} 
    }

  }

 async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
   
  try {
    const {name,
      rut,
      age,
      scholarship,
      post,
      id_faena, 
      driver_license,
      valid_driver_license} = updateEmployeeDto

      const employee = await this.employeeModel.findOneAndUpdate({_id:id},{
       name,
      rut,
      age,
      scholarship,
      post,
      id_faena, 
      driver_license,
      valid_driver_license

      }, {new:true})
    return employee;
  
    
  } catch (error) {
    return {"message":error}
  }
 }
async  remove(id: string) {
    

    try {
      await this.employeeModel.findOneAndDelete({_id:id})
      return {"data":"user deleted"}
    } catch (error) {
      return {"message":error}
    }
  }
}
