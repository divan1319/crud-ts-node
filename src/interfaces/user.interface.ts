import { RowDataPacket} from "mysql2";

export interface User extends RowDataPacket{
    id:number,
    uuid:string,
    username:string,
    email:string,
    password:string
}