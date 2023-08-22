import {Schema} from "mongoose"

export const employeeSchema = new Schema({
    name:String,
    rut:String,
    age:Number,
    scholarship:String,
    post:String,
    id_faena: { type: Schema.Types.ObjectId, ref: 'faena'},
    driver_license:String,
    valid_driver_license:String,
    dateAt: { type: Date, default: Date.now },
    dateEnd:Date
})