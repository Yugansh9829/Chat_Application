import React, { useEffect, useState } from "react";
import User from "./user.js";
import "./allusers.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export default function App(props) {
    const [users, setusers] = useState([{}]);
    const [user_name, setname] = useState("");
    const [user_email, setemail] = useState("");
    const [user_id, setid] = useState("");//receiver id(to)
    const [message, setmessage]= useState("");//message content
    const [my_id, setmyid] = useState(""); //sender id(from)
    
    useEffect(() => {
        //on molding the page it first get all users 
        async function getusers() {
            const resp = await fetch("http://localhost:4000/getusers/user");
            const result = await resp.json();
            if (result.success) {
                setusers(result.users);
                //now this users contains id of all users
            } else {
                console.log("users are not fetched from backend in useEffect");
            }
        }
        //then it should fetch sender's id from db.
        async function getid(){
            const resp = await fetch(`http://localhost:4000/user/getID/${localStorage.getItem("token")}`);
            const result = await resp.json();
            if(result.success){
                setmyid(result.id);
            }else{
                console.log("some error occured while getting my id from backend : ");
            }
        }
        getusers();
        getid();

    }, [])

    useEffect(()=>{
        //here we will form a socket connection with the server
        const socket = io.connect("http://localhost:3001");
        //and when ever updates we will close the previous connection.
        socket.on(`${my_id}`,(message)=>{
            const div = document.getElementById("display-messages");
            const p = document.createElement('p');
            p.innerText = message;
            div.appendChild(p);
        });
        
        return ()=>{
            socket.disconnect();
            console.log("socket connection disconnected for user : ", user_id);
        }
    }, [user_id]);

    //receining and displaying message on console.
    

    //while sending message
    const handlesubmit = async (e)=>{
        e.preventDefault();
        //store this message in db.
        if(!my_id || !user_id){
            console.log("my id is : ", my_id);
            console.log("user id is : ", user_id);
            alert("please select an user first or type and message");
            return;
        }
        //I will add this message and info. regarding this message in my database
        const re = await fetch("http://localhost:4000/",{
            method : "POST",
            body : JSON.stringify({message,user_id, my_id}),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        const r = await re.json();
        if(!r.success){
            console.log("message is not stored in database");
            return;
        }
        //to send message to particular user
        const mess = {
            to : user_id,
            cont : message
        }
        //Now I will send this message content along with its receiver id to backend
        socket.emit("message",mess);
        //now we will set message again to null.
        setmessage("");
        const element = document.getElementById("one");
        element.value="";

        console.log("message sent");
    }

    return (
        <>
            {/* {console.log("here is user list : ", users)} */}

            <div className="chat-page">
                <div className="users">
                    <h1 className="heading">list of all users are as follow</h1>
                    <div >
                        {users.map(user => <User key={user.id} user={user} setname={setname} setid={setid} setemail={setemail}/>)}
                    </div>
                </div>


                <div className="chat-box">
                    <div className="fixed">
                        <div className="user-details">
                            <h4>{`${user_name}`}</h4>
                            <h4>{`${user_email}`}</h4>
                        </div>
                        <div className="messages">
                            <div id="display-messages">
                                <div>
                                     
                                </div>
                            </div>
                            <div className="type-box">
                                <input id="one" type="text" onChange={(e)=>{setmessage(e.target.value)}}></input>
                                <button onClick={handlesubmit}>SEND</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* {how to display each element of array as an component here} */}
            {/* //at frontend we has all users and their id by which we can send req(emit) to backend with its user_id and the backend wil send this message to specific user with that id using emit. */}

        </>
    )
}