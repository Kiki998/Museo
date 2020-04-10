import mongoose = require("mongoose");
import {connectMongoDB} from "./helpers"
import {Obra} from "./Obras";

export interface IProveedor extends mongoose.Document { 
    name: string;
    correo: string;
    id: string;
}

const ProveedorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    correo: { type: String, requires: true },
    id: { type: String, required: true }
});

export const Proveedor = mongoose.model<IProveedor>("Proveedor", ProveedorSchema);

export const CreateProveedor = async function(correo: string, name: string, id: string){
    await connectMongoDB;
    

    const newOne = new Proveedor();
    newOne.name = name;
    newOne.id = id;
    newOne.correo = correo;


    newOne.save( (err:any) =>{
        if(err){
            console.log(err.message);
        }else{
            console.log(newOne);
        }
    } );
}

export function getProveedor(_name: string):Promise<any>{
    return new Promise<any>( resolve => {
        Proveedor.findOne({ name: _name}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}
   
