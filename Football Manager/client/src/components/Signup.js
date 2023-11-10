// import { useState } from "react";
// import Axios from 'axios'
// import { Link } from "react-router-dom";

// export function Signup() {
//     // Create a state for each variable
//     const [team_name, setteam_name] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const postteamname = () => {
//       Axios.post('http://localhost:3001/main', {
//           team_name: team_name,}).then(()=> {
//             console.log("GOING TO MAIN PAGE");
//           })
//     };
//     const addTeam = () => {
//     Axios.post('http://localhost:3001/create', {
//           team_name: team_name, 
//           password: password, 
//           email: email,}).then(()=> {
//             console.log("SUCCESS");
//             postteamname();
//           })
//       }
    
//       return (
//         <div className="App">
//           <label>Team Name : </label>
//           <input type="text" onChange={(event) => {
//             setteam_name(event.target.value);
//           }}/>
//           <label>Password : </label>
//           <input type="password" onChange={(event) => {
//             setPassword(event.target.value);
//           }}/>
//           <label>Email ID : </label>
//           <input type="text" onChange={(event) => {
//             setEmail(event.target.value);
//           }}/>
//           <Link to="/main"><button onClick={addTeam}>Signup</button></Link>
//         </div>
//       );
// }

import { useState } from "react";
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
    const [team_name, setteam_name] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const addTeam = () => {
        Axios.post('http://localhost:3001/create', {
            team_name: team_name, 
            password: password, 
            email: email,
        }).then((response) => {
            console.log("SUCCESS");
            if (response.data && response.data.data === "Values Inserted") {
                // Team created successfully
                localStorage.setItem('team_name', team_name);
                console.log("GOING TO MAIN PAGE");
                navigate('/main');
            } else {
                // Display error message if team_name already exists
                setError("Team with that team name already exists. Please choose another team name.");
            }
        })
        .catch((error) => {
            console.log("Error during signup:", error);
            console.log(error.response.data)
            if (error.response.data.data === "Team name already exists") {
              setError("Team name already exists. Use a different team name");
              // setError("Team name already exists. Use a different team name");
            } else {
              setError("Error during signup");
            }
        });
    }

    return (
        <div className="App">
            <label>Team Name : </label>
            <input type="text" onChange={(event) => setteam_name(event.target.value)} />
            <label>Password : </label>
            <input type="password" onChange={(event) => setPassword(event.target.value)} />
            <label>Email ID : </label>
            <input type="text" onChange={(event) => setEmail(event.target.value)} />

            <button onClick={addTeam}>Signup</button>

            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}
