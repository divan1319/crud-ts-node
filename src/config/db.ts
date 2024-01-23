import * as dotenv from "dotenv"
import mysql from "mysql2"

dotenv.config()

export default mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"daniel.lopez",
    database:"testdb"
})