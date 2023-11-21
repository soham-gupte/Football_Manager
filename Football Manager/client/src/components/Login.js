import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../styles/LoginStyles.css'
import { Button } from "react-bootstrap";

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
      .then((response) => {
        console.log("LOGIN SUCCESS");
        // Check if the response includes data indicating success
        if (response.data && response.data.data === "Login Successful") {
          localStorage.setItem('team_name', team_name);
          navigate('/main'); // Navigate to /main directly
        } else {
          setError(`No team with the name ${team_name} exists`);
        }
      })
      .catch((error) => {
        console.log("Error during login:", error);
        // console.log(error.response.data)
        if (error.response.data === "User not found") {
          setError("No user found with this team name");
        }
        else {
          setError("Wrong password. Please try again.");
        }
      });
  }

  return (
    <div className="LoginPage">
      <div className="login-box">
        <h4>Team Name</h4>
        <input type="text" onChange={(event) => setTeamName(event.target.value)} />
        <h4>Password</h4>
        <input type="password" onChange={(event) => setPassword(event.target.value)} />
        <hr></hr>

        <Button onClick={login}>Login</Button>

        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
}