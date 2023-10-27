import * as dotenv from "dotenv"
import mysql from "mysql2"

dotenv.config()

export default mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DB
})