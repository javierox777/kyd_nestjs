import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Companys & Document;


@Schema()
export class Companys {

    @Prop()
    name:string;

    @Prop()
    email:string;

    @Prop()
    address:string;

    @Prop()
    rut:string;

    @Prop()
    city:string;

    @Prop()
    faena: string;

    @Prop()
    contract_number:Number

    @Prop()
    password:string;


}


export const companySchema = SchemaFactory.createForClass(Companys);



