import connection from "../config/db";
import { ResultSetHeader   } from "mysql2";
import { User } from "../interfaces/user.interface";
import { v4 as random } from "uuid";
import bcrypt from "bcryptjs";


interface IUserRepository {
  save(user: User):Promise<User|string>;
  retrieveAll(searchParam: {
    email: string;
    username: string;
  }): Promise<User[]>;
  retrieveById(id: number): Promise<User | undefined>;
  update(user: User): Promise<number>;
  delete(id: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class UserRepository implements IUserRepository {
  async save(user: User):Promise<User|string>{

    try {
      let uuid = random();
      let salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(user.password, salt);
      let message:string=""
      const usuaui = connection.execute(
        "INSERT INTO users (uuid,username,email,password) VALUES(?,?,?,?)",
        [uuid, user.username, user.email, hashPassword]);
        console.log([usuaui].map(u=>u.))
        return message
        
    } catch (error) {
      return "error en la consulta"
    }

  }

  retrieveById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      connection.query<User[]>(
        "SELECT * FROM users WHERE id= ?",
        [id],
        (err, res) => {
          if (err) reject(err);

          resolve(res?.[0]);
        }
      );
    });
  }

  retrieveAll(searchParam: {
    email?: string;
    username?: string;
  }): Promise<User[]> {
    let query: string = "SELECT * FROM users";
    let condition: string = "";

    if (searchParam?.username && searchParam?.email) {
      condition += `email = '${searchParam.email}' AND username = '${searchParam.username}'`;
    }

    if (condition.length) query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<User[]>(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  update(user: User): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "UPDATE users SET uuid= ?, username = ?, email =? WHERE id = ?",
        [user.uuid, user.username, user.email, user.id],
        (err, res) => {
          if (err) reject(err);

          resolve(res.affectedRows);
        }
      );
    });
  }

  delete(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "DELETE FROM users WHERE id = ?",
        [id],
        (err, res) => {
          if (err) reject(err);

          resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>("DELETE FROM users", (err, res) => {
        if (err) reject(err);

        resolve(res.affectedRows);
      });
    });
  }
}

export default new UserRepository();
