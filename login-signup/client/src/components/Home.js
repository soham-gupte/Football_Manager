// import { useState } from "react";4
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

export function Home() {
    return (
        <div className="signup-btn">
            <Link to="/signup"><button >Signup</button></Link>
        </div>
    )
}