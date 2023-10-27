import {Application} from "express"
import userRoutes from "./user.routes"
import homeRoutes from "./home.routes"

export default class Routes{
    constructor(app:Application){
        app.use("/api",homeRoutes)
        app.use("/api/user",userRoutes)
    }
}