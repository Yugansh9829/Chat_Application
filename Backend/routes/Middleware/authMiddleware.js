import { getUser } from "../userRoute.js";

function isLoggedIn(req,res,next){
    console.log("******** reached to middle ware *******");
    const User_id = req.cookies?.uid;
    console.log(User_id);
    if(!User_id)return res.status(404);
    console.log("cookie founded");
    //now we verify this user with uid present in cookie
    const user = getUser(User_id);

    if(!user)return res.redirect("/login");
    //now we verified the id thus we will 
    console.log(user);
    req.user = user;
    next();
}

export {isLoggedIn};