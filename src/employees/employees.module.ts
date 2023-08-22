import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { employeeSchema } from './models/employees.model';

@Module({
  imports : [MongooseModule.forFeature([{name:'employees', schema:employeeSchema}])],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}
