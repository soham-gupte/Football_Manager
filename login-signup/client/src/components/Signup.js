import { useState } from "react";
import Axios from 'axios'

export function Signup() {
    // Create a state for each variable
    const [teamName, setTeamName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const addTeam = () => {
    Axios.post('http://localhost:3001/create', {
          teamName: teamName, 
          password: password, 
          email: email,}).then(()=> {
            console.log("SUCCESS");
          })
      }
    
      return (
        <div className="App">
          <label>Team Name : </label>
          <input type="text" onChange={(event) => {
            setTeamName(event.target.value);
          }}/>
          <label>Password : </label>
          <input type="password" onChange={(event) => {
            setPassword(event.target.value);
          }}/>
          <label>Email ID : </label>
          <input type="text" onChange={(event) => {
            setEmail(event.target.value);
          }}/>
          <button onClick={addTeam}>Add Employee</button>
        </div>
      );
}