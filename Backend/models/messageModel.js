import mongoose from "mongoose";
mongoose.connect("mongodb+srv://yuganshsoni8:Jso0k4ICaxxzIxAu@cluster1.bels7cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1");

const messageSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
}, {timestamps : true})

const Message = mongoose.model('Message', messageSchema);

export default Message;