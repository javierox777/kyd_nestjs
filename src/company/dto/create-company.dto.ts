import { IsEmail, MinLength } from 'class-validator';

export class CreateCompanyDto {

    name:string;
    @IsEmail()
    email:string;
    address:string;
    rut:string;
    city:string 
    faena:string
    contract_number:string;
    @MinLength(8)
    password:string
}
