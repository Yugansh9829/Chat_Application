import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sign_up.css"


export default function Apps(props){
    const nvg = useNavigate();
    const [email,setemail] = useState("");
    const [password, setpass] = useState("");
    const [name, setname] = useState("");

    const handle_submit = async (e)=>{
        e.preventDefault();
        if(email==="" || password==="" || name===""){
            console.log("please enter email and password");
            nvg("/");
            
        }
        else{
            try{
                const re = await fetch(`http://localhost:4000/${email}`);
                if(!re.ok){
                    throw new Error(`\nError status :${re.status}`);
                }
                const result = await re.json();
               
                if(re.ok){
                    console.log(result);
                    if(result.length === 1){
                        console.log("you already have and account");
                        nvg('/login');
                    }
                    else{
                        try{
                            const resp = await fetch(`http://localhost:4000/sign_up`,
                                {
                                    method : "POST",
                                    body : JSON.stringify({email,password,name}),
                                    headers : {
                                        "Content-Type" : "application/json",
                                    }
                                }
                            )
                            const result = await resp.json();
                            if(result.success){
                                localStorage.setItem("token", result.token);
                                nvg("/all_users");
                            }
                            else{
                                nvg("/");
                                console.log("data is not fetched from backend : \n");
                            }
                        }catch(err){
                            console.log("some error occured while posting registration data : ", err.message);
                        }
                    }
                    
                    
                }
            }catch(err){
                console.log("unable to fetch user data in signup page from backend", err.message);
            }
        }
    }

    return(
        <>
            <div className="signup_">
                <h1>ENTER YOUR DETAILS</h1>
                <form action="/" method="POST">
                <label>Enter your Name</label>
                <input type="name" value={name} onChange={(e)=>{setname(e.target.value)}} placeholder="ENTER NAME"></input>
                <label>Enter your E-Mail</label>
                <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder="ENTER EMAIL"></input>
                <label>Enter your Password</label>
                <input type="password" value={password} onChange={(e)=>{setpass(e.target.value)}} placeholder="ENTER PASSWORD"></input>

                <button type="submit" onClick={handle_submit}>Submit</button>
            </form>
            </div>
            
        </>
    )
};