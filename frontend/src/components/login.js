import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"

export default function App(props){
const nvg = useNavigate();
const [email, setemail]= useState("");
const [password, setpass]= useState("");

const handle_submit = async (e)=>{
    e.preventDefault();
    // const payload = {email , password};
    try{
        const response = await fetch("http://localhost:4000/login",
            {
                method : "POST",
                body : JSON.stringify({email,password}),
                headers : {
                    "Content-Type" : "application/json"
                }
        });

        const result = await response.json();
        if(!response.ok)   {
            console.log("please enter correct email or password")
        }
        if(response.ok){
            if(result.success){
                console.log(result.message);
                console.log(result.token); // Assuming the token is returned in the response
				localStorage.setItem("token", result.token);
                nvg("/all_users");
            }else{
                alert("enter correct email and password");
                
            }
        }
    }catch(err){
        console.log("some error occured while login user : ", err.message);
    }
}


    return(
        <>
            <div className="login-div">
                <h1>PLEASE ENTER YOUR DETAILS</h1>
                <form action="/" method="POST">
                <label>Enter your Email</label>
                <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter your email"></input>
                <label>Enter your Password</label>
                <input type="password" value={password} onChange={(e)=>{setpass(e.target.value)}} placeholder="Enter your password"></input>
                <button type="submit" onClick={handle_submit}>Submit</button>
            </form>
            </div>
            
        </>
    )
}