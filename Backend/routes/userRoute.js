import express,{urlencoded} from "express";
import {findUser, SignInUser, LoginUser, verifytoken, getusers, postMessage, getID} from "./controllers/user_controllers.js";
import cookieParser from "cookie-parser";


const Router = express.Router();

Router.use(express.json());
Router.use(cookieParser());

Router.get("/:email", findUser);
Router.post("/sign_up", SignInUser);
Router.post("/login", LoginUser);
Router.get("/t/:token", verifytoken);
Router.get("/getusers/user", getusers);
Router.post("/",postMessage);
Router.get("/user/getID/:token", getID);
export default Router;
