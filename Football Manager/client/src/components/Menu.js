import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export function Menu() {
    const [team_name, setTeamName] = useState('');
    const [teamBudget, setTeamBudget] = useState(null);

    useEffect(() => {
        // Retrieve team_name from localStorage
        const storedTeamName = localStorage.getItem('team_name');

        // Update state with the retrieved team_name
        if (storedTeamName) {
            setTeamName(storedTeamName);
        }
    }, []);

    useEffect(() => {
        // Fetch team budget when team_name changes
        if (team_name) {
            fetchTeamBudget(team_name);
        }
    }, [team_name]);

    const fetchTeamBudget = (teamName) => {
        // Fetch team budget
        axios.post('http://localhost:3001/getTeamBudget', { team_name: teamName })
            .then(response => {
                const budget = response.data.teamBudget;
                setTeamBudget(budget);
                console.log(teamName, budget);
            })
            .catch(error => {
                console.error('Error fetching team budget:', error);
            });
    };

    return (
        <div className="main-menu">
            <div className='main-menu-contents'>
                <h1>{team_name}</h1>
                {teamBudget !== null && <h2>Budget: &euro;{teamBudget}</h2>}
                <a href='/marketplace'><Button variant="secondary">Marketplace</Button></a>
                <a href='/notifications'><Button variant="secondary">Notifications</Button></a>
                <a href='/transaction'><Button variant="secondary">Transactions</Button></a>
                <a href='/'><Button variant="secondary">Sign Out</Button></a>
            </div>
        </div>
    )
}
