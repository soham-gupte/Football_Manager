import Axios from "axios";
import { useState, useEffect } from "react";

export function Marketplace() {
    const [team_name, setTeamName] = useState('');
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // Retrieve username from localStorage
        const storedTeamName = localStorage.getItem('team_name');

        // Update state with the retrieved username
        if (storedTeamName) {
            setTeamName(storedTeamName);
        }

        // Run the retrievemarketplace function when the component mounts
        Axios.post('http://localhost:3001/retreivemarketplace', {
            team_name: team_name,
        }).then((response) => {
            console.log("Marketplace retrieved successfully !");
            // Ensure response.data.player_name is defined before setting it in the state
            if (response.data.player_name) {
                // Assuming all arrays have the same length and are synchronized
                const newPlayers = response.data.player_name.map((name, index) => ({
                    player_name: name,
                    position: response.data.position[index],
                    nationality: response.data.nationality[index],
                    value: response.data.value[index]
                }));
                setPlayers(newPlayers);
            }
        }).catch((error) => {
            console.log("Some error occurred :(");
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [team_name]);

    return (
        <div className="marketplace">
            <h1>{team_name}</h1>
            <h1>MARKETPLACE</h1>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>
                        <strong>{player.player_name}</strong> - {player.position}, {player.nationality}, Value: {player.value}
                    </li>
                ))}
            </ul>
        </div>
    );
}