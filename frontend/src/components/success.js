import React, { useState, useEffect} from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

socket.on("mess", (message)=>{
    console.log(message);
    const div = document.getElementById("messages");
    const p = document.createElement('p');
    p.innerText = message;
    div.appendChild(p);
})










export default function App(props){
    const nav = useNavigate();
    console.log(props.id);
    useEffect(()=>{

        if(localStorage.getItem("token")===null){
            alert("please login as your previous session expires");
            nav("/login");
        }
        else{
            async function verify(){
                const resp = await fetch(`http://localhost:4000/t/${localStorage.getItem("token")}`);
                const result = await resp.json();
                if(result.success===true){
                    console.log("token is verified by jwt and data is : ", result.id);
                }else{
                    alert("please login again as your session expires");
                    nav('/login');
                }
            }
            verify();
        }
    },[localStorage.getItem("token")])




    const [message,setmessage] = useState("");

    const handleSend = (e)=>{

        e.preventDefault();
        socket.emit("message", message);
        setmessage("");
        const element = document.getElementById("one");
        element.value="";
        return;
    }
    return(
        <>
            <h1>Chat here</h1>
            <input id="one" type="text" onChange={(e)=>setmessage(e.target.value)}></input>
            <button onClick={handleSend}>Send Message</button>
            {/* <h1> Successfully logged IN or Registered in our DataBase</h1>
            <button onClick={handleCookie}>Click to generate cookie</button> */}

            <div id="messages">
                
            </div>
        </>
    )
}

//     const handleCookie = ()=>{
//         fetch("http://localhost:4000/success",{
//             credentials : 'include'
//         })
//         .then(res => res.text())
//         .then(data => {
//             console.log(data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//         // console.log(res);
//         // if(res.ok){
//         //     console.log(res.cookie);
//         //     console.log("checked for cookie");
//         // }else{
//         //     console.log("errror occured at success route", res.status);
//         // }
//     }