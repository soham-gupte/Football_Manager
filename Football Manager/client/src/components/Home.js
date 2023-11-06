// import { useState } from "react";4
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

export function Home() {
    return (
        <div className="signup-login-btn">
            <Link to="/signup"><button >Signup</button></Link>
            <Link to="/login"><button >Login</button></Link>
        </div>
    )
}