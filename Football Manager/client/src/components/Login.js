import { useState } from "react";
import { Link } from "react-router-dom"; 
import Axios from 'axios';

export function Login() {
    // Create a state for each variable
    const [team_name, setteam_name] = useState("");
    const [password, setPassword] = useState("");
    const login = () => {
    Axios.post('http://localhost:3001/login', {
          team_name: team_name, 
          password: password,}).then(()=> {
            console.log("LOGIN SUCCESS");
          })
      }
    
      return (
        <div className="Login Page">
          <label>Team Name : </label>
          <input type="text" onChange={(event) => {
            setteam_name(event.target.value);
          }}/>
          <label>Password : </label>
          <input type="password" onChange={(event) => {
            setPassword(event.target.value);
          }}/>
          <Link to="/main"><button onClick={login}>Login</button></Link>
        </div>
      );
}