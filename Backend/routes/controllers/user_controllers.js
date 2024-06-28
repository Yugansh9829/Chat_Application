import User from "../../models/userModel.js";
import Message from "../../models/messageModel.js";
import jwt from "jsonwebtoken";


async function findUser(req, res) {
    try {
        const email = req.params.email;
        // console.log(email);
        const data = await User.find({
            email: email
        });
        // console.log(data);
        res.json(data);
    } catch {
        console.log("error occured while taking data from database in signup process");
    }
}

async function SignInUser(req, res) {
    const { email, password, name } = req.body;
    try {
        const data = await User.create({
            name: name,
            email: email,
            password: password,
        })
        console.log("data id is ", data._id.toString());
        const token = jwt.sign({ _id: data._id.toString() }, process.env.SECRET_KEY, {
            expiresIn: "1hr",
        });
        res.cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 3600),
            httpOnly: true,
            secure: false,
        });
        res.json({success : true, token : token});
        return;
    } catch (err) {
        console.log("some error occure in /signup in userRoute", err.message);
    }

    //now check if this user contains token in cookie and if contains then ....
    //here we are signing in so we will generate the token and assigned it to cookie for the user
}

function success(req, res) {
    try {
        // console.log("the user at success route is : ", req.user);
        res.cookie('text', 'first', { httpOnly: true, secure: false, sameSite: 'Strict' });
        res.send('cookie is set');
    } catch (err) {
        console.log("error generated : ", err.message);
    }
}


async function LoginUser(req, res) {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "please provide email and password" });
    }
    const Email = email.toLowerCase();

    const user = await User.findOne({ email: Email });
    if (user === null) {
        res.status(404).json({success : false});
        return;
    } else {
        // const validate = await bcrypt.compare(password, user.password);
        try{
            const token =  jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
                expiresIn: "1hr",
            });
            res.cookie("token", token, {
                expires: new Date(Date.now() + 1000 * 3600),
                httpOnly: true,
                secure: false,
            });
            res.status(200).json({ success: true, message: user, token: token });
        }
        catch(err){
            console.log("some error occured at loggedin page : ", err.message);
        }
    }
}

async function verifytoken(req, res){
    try{
        console.log("reached at token verification");
        const token = req.params.token;
        const data = jwt.verify(token,process.env.SECRET_KEY);
        res.json({success : true, id : data._id});
    }catch(err){
        console.log("wrong token is there ");
        res.status(404).json({success : false});
    }
   
}

async function getusers(req,res){
    //this will return all users {name, id} from backend
    try{
        console.log("reached");
        const users = await User.find();
        const id = [];
        users.forEach((user) => {
            id.push({"name": user.name, "id": user._id, "email": user.email});
        });
        res.json({success : true, users : id});
        return;
    }catch(err){
        console.log("error while fetching users from database ", err.message);
        res.status(404).json({success : false});
    }
}

async function postMessage(req,res){
    const {message, user_id , my_id } = req.body;
    try{
        const data = await Message.create({
            from : my_id,
            to : user_id,
            content : message
        });
        console.log("new message sent :", data);
        res.json({success : true});
    }catch(err){
        console.log("some error occured while posting message to database", err.message);
    }
}

async function getID(req,res){
    try{
        console.log("I am here");
        const token = req.params.token;
        const data = jwt.verify(token, process.env.SECRET_KEY);
        res.json({success : true, id : data._id});


    }catch(err){
        console.log("error occured while getting my id from backend :", err.message);
    }
}

export { findUser, SignInUser, success, LoginUser, verifytoken, getusers, postMessage, getID};