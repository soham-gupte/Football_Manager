// import React from 'react';
// import "../styles/MainStyles.css"
// import { useEffect, useState } from 'react';
// import { Menu } from './Menu';
// // import {player_icon} from "../images/player-icon.png"


// function PlayerCard(props) {
//     return (
//         <div className="player-card">
//             <div className="player-card-body">
//                 <img src={props.img} alt="" />
//                 <h2 className="player-card-title">{props.name}</h2>
//             </div>
//             <button className="player-btn">View</button>
//         </div>
//     )
// }

// export function Main() {
//     return (
//         <div className="main">
//             <Menu />
//             <div className="all-players">
//                 <h1>Playing 11</h1>
//                 <div className="player-content">
//                     {playing11Array.map((item, index) => {
//                         return (
//                             <PlayerCard img={item.img} name={item.name} />
//                         )
//                     })}
//                 </div>
//                 <h1>Substitutes</h1>
//                 <div className="player-content">
//                     {substitutesArray.map((item, index) => {
//                         return (
//                             <PlayerCard img={item.img} name={item.name} />
//                         )
//                     })}
//                 </div>
//             </div>
//         </div>
//     )
// }

// const playing11Array = [
//     {
//         name: "Lionel Messi1",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Lionel Messi2",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Lionel Messi3",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Lionel Messi4",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Lionel Messi5",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Lionel Messi6",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Lionel Messi7",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Lionel Messi8",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Lionel Messi9",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Lionel Messi10",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Lionel Messi11",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     }
// ]

// const substitutesArray = [
//     {
//         name: "Krishna Rolando1",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Krishna Rolando2",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Krishna Rolando3",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Krishna Rolando4",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Krishna Rolando5",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Krishna Rolando6",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Krishna Rolando7",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Krishna Rolando8",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     },
//     {
//         name: "Krishna Rolando9",
//         img: "https://static.thenounproject.com/png/4156707-200.png"
//     }
// ]

//___________________________________________________
import React, { useEffect, useState } from 'react';
import "../styles/MainStyles.css"
import { Menu } from './Menu';
import axios from 'axios'; // Import Axios

function PlayerCard(props) {
    return (
        <div className="player-card">
            <div className="player-card-body">
                <img src={props.img} alt="" />
                <h2 className="player-card-title">{props.name}</h2>
            </div>
            <button className="player-btn">View</button>
        </div>
    )
}

export function Main() {
    const [playing11Array, setPlaying11Array] = useState([]);
    const [substitutesArray, setSubstitutesArray] = useState([]);

    useEffect(() => {
        // Fetch team_name from localStorage
        const team_name = localStorage.getItem('team_name');

        // Fetch data from server if teamName exists
        if (team_name) {
            axios.post('http://localhost:3005/squad', { team_name })
                .then(response => {
                    const { playing11Array, substitutesArray } = response.data;

                    // Set default image URL
                    const defaultImgUrl = "https://static.thenounproject.com/png/4156707-200.png";

                    // Update playing11Array with default image
                    const updatedPlaying11Array = playing11Array.map(playerName => ({
                        name: playerName,
                        img: defaultImgUrl
                    }));

                    const updatedSubstitutesArray = substitutesArray.map(playerName => ({
                        name: playerName,
                        img: defaultImgUrl
                    }));

                    setPlaying11Array(updatedPlaying11Array);
                    console.log("Playing 11 Array:", updatedPlaying11Array);
                    setSubstitutesArray(updatedSubstitutesArray);
                    console.log("Playing 11 Array:", substitutesArray);
                })
                .catch(error => {
                    console.error("Error fetching squad data:", error);
                });
        }
    }, []); 

    return (
        <div className="main">
            <Menu />
            <div className="all-players">
                <h1>Playing 11</h1>
                <div className="player-content">
                    {playing11Array.map((item, index) => {
                        return (
                            <PlayerCard img={item.img} name={item.name} />
                        )
                    })}
                </div>
                <h1>Substitutes</h1>
                <div className="player-content">
                    {substitutesArray.map((item, index) => {
                        return (
                            <PlayerCard img={item.img} name={item.name} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
