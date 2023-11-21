// import { useState } from "react";4
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "../styles/HomeStyles.css";
import { Button } from "react-bootstrap";

export function Home() {
    return (
        <div className="home">
            <div className="signup-login-btn">
            <h1>Football Manager</h1>
            <hr></hr><br></br>
                <Link to="/signup"><Button className="signup-button">Signup</Button></Link>
                <Link to="/login"><Button className="login-button">Login</Button></Link>
            </div>
        </div>
    )
}