import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot("mongodb://mongo:SLndjgmqSLkfTlF8f3rB@containers-us-west-158.railway.app:7435"), CompanyModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
