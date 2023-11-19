import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export function Menu() {
    const [team_name, setTeamName] = useState('');

    useEffect(() => {
        // Retrieve username from localStorage
        const storedTeamName = localStorage.getItem('team_name');

        // Update state with the retrieved username
        if (storedTeamName) {
            setTeamName(storedTeamName);
        }
    }, []);
    return (
        <div className="main-menu">
            <div className='main-menu-contents'>
                <h1>{team_name}</h1>
                <a href='/marketplace'><Button variant="secondary">Marketplace</Button></a>
                <a href='/trading'><Button variant="secondary">Trading</Button></a>
                <a href='/notifications'><Button variant="secondary">Notifications</Button></a>
                <a href='/transaction'><Button variant="secondary">Transactions</Button></a>
            </div>
        </div>
    )
}