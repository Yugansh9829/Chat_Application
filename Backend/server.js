import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import Router from "./routes/userRoute.js";
import http from "http";
import {Server} from "socket.io";

dotenv.config();
app.use(
    cors({
      origin: 'http://localhost:3000', // Specify the exact origin
      credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json()) //For JSON requests
//Middlewares
app.use(express.urlencoded({extended: true}));




const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin : "http://localhost:3000",
    }
});

server.listen(3001, ()=>{
    console.log("web socket server is running on port : ", 3001);
})


//io will handle all our requests
// io.listen(4000);

io.on('connection', (socket) =>{ //whenever we made a connection than we get socket which is client. means whenever connnection forms we run this call back function and get client object in it.
    // console.log("new user is connected as socket : ", socket.id);
    socket.on("message", (message)=>{
        //now we send this message to all users on server(io)

        console.log("here is message", message);
        io.emit(`${message.to}`, message.cont);
    })

})




mongoose
.connect(process.env.URI)
.then(()=>{
    console.log("successfully connected to the database");
    try{
        app.listen(process.env.PORT,(req,res)=>{
            console.log(`server is listening at port ${process.env.PORT}`);
        });
    }catch(err){
        console.log(`some error occured while setting up server on port ${process.env.PORT}`);
    }
   
})
.catch((error)=>{
    console.log("error occured \n", error);
})
app.use(Router);











