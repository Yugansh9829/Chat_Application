import mongoose from "mongoose";
mongoose.connect("mongodb+srv://yuganshsoni8:Jso0k4ICaxxzIxAu@cluster1.bels7cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1");

//creating Schema
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password: {
        type : String,
    }
}, {timestamps : true});
//creating model
const User = mongoose.model('User',userSchema);

//returning User from this module to server.js
export default User;




//here we are exporting the model which will be used to intreact with our database(merndb). 