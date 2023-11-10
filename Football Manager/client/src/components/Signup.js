import { useState } from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";

export function Signup() {
    // Create a state for each variable
    const [team_name, setteam_name] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const postteamname = () => {
      Axios.post('http://localhost:3001/main', {
          team_name: team_name,}).then(()=> {
            console.log("GOING TO MAIN PAGE");
          })
    };
    const addTeam = () => {
    Axios.post('http://localhost:3001/create', {
          team_name: team_name, 
          password: password, 
          email: email,}).then(()=> {
            console.log("SUCCESS");
            postteamname();
          })
      }
    
      return (
        <div className="App">
          <label>Team Name : </label>
          <input type="text" onChange={(event) => {
            setteam_name(event.target.value);
          }}/>
          <label>Password : </label>
          <input type="password" onChange={(event) => {
            setPassword(event.target.value);
          }}/>
          <label>Email ID : </label>
          <input type="text" onChange={(event) => {
            setEmail(event.target.value);
          }}/>
          <Link to="/main"><button onClick={addTeam}>Signup</button></Link>
        </div>
      );
}