import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { IsEmail, } from 'class-validator'

export type EmployeeDocument = Employee & Document;

export class Employee {
    @Prop()
    name:string
    @Prop()
    rut:string
    @Prop()
    age:Number
    @Prop()
    scholarship:string
    @Prop()
    post:string
    @Prop({ type: Schema.Types.ObjectId, ref: 'companys' }  
      )
    id_faena: Schema.Types.ObjectId; 
    @Prop()
    driver_license:string
    @Prop()
    valid_driver_license:string
    @Prop()
    dateAt: Date
    @Prop()
    dateEnd:Date

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);