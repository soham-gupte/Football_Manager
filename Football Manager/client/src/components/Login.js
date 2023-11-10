import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';

export function Login() {
  const [team_name, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      team_name: team_name,
      password: password,
    })
    .then(() => {
      console.log("LOGIN SUCCESS");
      navigate('/main'); // Navigate to /main directly
    })
    .catch((error) => {
      console.error("Error during login:", error);
      setError("Wrong password. Please try again.");
    });
  }

  return (
    <div className="Login Page">
      <label>Team Name : </label>
      <input type="text" onChange={(event) => setTeamName(event.target.value)} />
      <label>Password : </label>
      <input type="password" onChange={(event) => setPassword(event.target.value)} />
      
      <button onClick={login}>Login</button>

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
