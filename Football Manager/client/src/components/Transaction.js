import { useState, useEffect } from "react";
import Axios from "axios";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

export function Transaction() {
    // Use useState to manage the team_name value
    const [teamName, setTeamName] = useState("hello");

    useEffect(() => {
        // Retrieve team_name from localStorage
        const storedTeamName = localStorage.getItem('team_name');

        if (storedTeamName) {
            // Update the team_name using setTeamName
            setTeamName(storedTeamName);

            Axios.post('http://localhost:3001/transactionHistory', {
                team_name: storedTeamName,
            }).then((response) => {
                console.log("boooooo");
            }).catch((error) => {
                console.log("Some error occurred");
            });
        }
    }, []);

    return (
        <div>
            <h1>{teamName}</h1>
        </div>
    );
}