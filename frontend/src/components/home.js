import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"

export default function App_(props) {
    const nav = useNavigate();

    const handleLogin = () => {
        nav('/login');
    }

    const handleRegister = () => {
        nav('/sign_up');
    }

    return (
        <>
        <div className="Home_page">
        <h1>WELCOME TO OUR CHATTING APP</h1>
            <div className="list">
                <div className="list-item">
                    <p>click here to login</p>
                    <buttton style={{"border" : "2px solid black"}} onClick={handleLogin}> Login</buttton>

                </div>
                <div className="list-item">
                    <p>click here to register</p>
                    <buttton style={{"border" : "2px solid black"}} onClick={handleRegister}>Register</buttton>
                </div>
            </div>
            <br></br>
        </div>
           

        </>
    )
}