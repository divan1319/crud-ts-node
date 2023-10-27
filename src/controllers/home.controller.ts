import {Response,Request} from "express"

export function welcome(req:Request,res:Response){
    return res.json({message:"Hola xdd"})
}