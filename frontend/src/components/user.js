import React from "react";
//here two users will chat with each others...
// import io from "socket.io-client";  //importing io class/module
// const socket = io.connect("http://localhost/3001");     //initializing socket object of io class while connnecting it to backend.


export default function App(props){
    
    const chat = ()=>{
        props.setname(props.user.name);
        props.setid(props.user.id);
        props.setemail(props.user.email);
    }
    return(
        <>
            <div>
                <h3>{props.user.name}</h3>
                <p>{props.user.email}</p>
                <button onClick={chat}>CHAT</button>
                <hr></hr>
            </div>
            <div>
                
            </div>
        </>
    )
}