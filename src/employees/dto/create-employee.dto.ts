import { IsNumber, IsString } from "class-validator"

export class CreateEmployeeDto {
    @IsString()
    name:string
    @IsString()
    rut:string
    @IsNumber()
    age:Number
    @IsString()
    scholarship:string
    @IsString()
    post:string
    @IsString()
    id_faena: string
    @IsString()
    driver_license:string
    @IsString()
    valid_driver_license:string
}
