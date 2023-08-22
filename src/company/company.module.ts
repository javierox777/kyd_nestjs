import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Companys, companySchema } from 'src/company/models/company.model';

@Module({
  imports :[MongooseModule.forFeature([{ name: Companys.name, schema: companySchema }])],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
