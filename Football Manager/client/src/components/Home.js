// import { useState } from "react";4
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "../styles/HomeStyles.css";

export function Home() {
    return (
        <div className="home">
            <div className="signup-login-btn">
                <Link to="/signup"><button >Signup</button></Link>
                <Link to="/login"><button >Login</button></Link>
            </div>
        </div>
    )
}