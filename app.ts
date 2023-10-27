import express,{Application} from "express"
import Server from "./src"

const app: Application = express()
const server:Server = new Server(app)

const PORT: number = 8001;

app.listen(PORT,"localhost",function(){
    console.log(`Server is running on port ${PORT}`)
}).on("error",(err:any)=>{
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
      } else {
        console.log(err);
      }
})