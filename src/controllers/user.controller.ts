import {Request,Response} from "express";
import {User} from "../interfaces/user.interface"
import userRespository from "../repositories/user.respository";

export class UserController {
    async create(req: Request,res:Response){
        if(!req.body.email || !req.body.username || !req.body.password){
            res.status(400).send({
                message:"Campos vacios"
            })
            return
        }

        try {
            const user: User = req.body
            const saveUser = await userRespository.save(user)
            console.log(saveUser)
            res.status(201).json({saveUser})
            
        } catch (error) {
            res.status(500).json({
                message:"Hubo un error al insertar el usuario",
                error:error
            })
        }
    }

    async allUsers(req:Request,res:Response){
        const email = typeof req.query.email == "string" ? req.query.email : ""
        const username = typeof req.query.username === "string" ? req.query.username : ""
        
        try {
            const users = await userRespository.retrieveAll({email:email,username:username})
            res.status(200).json({
                users
            })
        } catch (error) {
            res.status(500).json({
                message:"Hubo un error"
            })
        }
    }

    async findOne(req: Request, res:Response){
        const id: number = parseInt(req.params.id)
        try {
            const user = await userRespository.retrieveById(id)
            if(user){
                res.status(200).json({user})
            }else{
                res.status(404).json({message:`No se pudo encontrar el usuario con el id ${id}`})
            }
            
        } catch (error) {
            res.status(500).json({
                message:"Hubo un error"
            })
        }
    }
}