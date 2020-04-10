import mongoose = require("mongoose");
import {IProveedor, getProveedor} from "./Proveedores"
import {connectMongoDB} from "./helpers"

interface IObra extends mongoose.Document { 
    name: string;
    name_autor: String;
    costo_alquiler: number;
    id: number;
    status_obra: Boolean;
    proveedor: IProveedor
}

const ObraSchema = new mongoose.Schema({
    name: { type: String, required: true},
    name_autor: {type: String, required: true},
    costo_alquiler: {type: Number, required: true},
    id: {type: String, required: true},
    status_obra: {type: Boolean, required: true},
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: "Proveedor" }
});


export const Obra = mongoose.model<IObra>("Obra", ObraSchema);

export const CreateObra = async function(nameProveedor:string, name:string, name_autor:string, costo_alquiler:number, id:number, status_obra:Boolean){
   
    await connectMongoDB;
   
    const prov:any = await getProveedor(nameProveedor);

    const p = new Obra();
    p.name = name;
    p.name_autor = name_autor;
    p.costo_alquiler = costo_alquiler;
    p.id =  id;
    p.status_obra = status_obra;
    p.proveedor = prov;

    p.save((err:any)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(p);
        }
    });
}

