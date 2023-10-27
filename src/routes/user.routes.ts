import {Router} from "express"
import {UserController} from "../controllers/user.controller"

class UserRoutes{
    router = Router()
    controller = new UserController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes(){
        this.router.post("/",this.controller.create)
        this.router.get("/",this.controller.allUsers)
        this.router.get("/:id",this.controller.findOne)
    }
}

export default new UserRoutes().router
