import { useState } from "react";
import Axios from 'axios'

export function Signup() {
    // Create a state for each variable
    const [team_name, setteam_name] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const addTeam = () => {
    Axios.post('http://localhost:3001/create', {
          team_name: team_name, 
          password: password, 
          email: email,}).then(()=> {
            console.log("SUCCESS");
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
          <button onClick={addTeam}>Signup</button>
        </div>
      );
}