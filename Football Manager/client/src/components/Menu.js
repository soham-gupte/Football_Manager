import { useState, useEffect } from "react";

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
                <a href='/marketplace'><button>Marketplace</button></a>
                <a href='/trading'><button>Trading</button></a>
                <a href='/notifications'><button>Notifications</button></a>
                <a href='/transaction'><button>Transactions</button></a>
            </div>
        </div>
    )
}