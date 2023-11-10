import React from 'react';
import "../styles/MainStyles.css"
// import {player_icon} from "../images/player-icon.png"


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
    return (
        <div className="main">
            <div className="main-menu">
                Hello
            </div>
            <div className="player-content">
                {/* <PlayerCard img="https://static.thenounproject.com/png/4156707-200.png" name="Hello" /> */}
                {playersArray.map((item, index) => {
                    return (
                        <PlayerCard img={item.img} name={item.name}/>
                    )
                })}
            </div>
        </div>
    )
}

const playersArray = [
    {
        name: "Lionel Messi1",
        img: "https://static.thenounproject.com/png/4156707-200.png"
    },
    {
        name: "Lionel Messi2",
        img: "https://static.thenounproject.com/png/4156707-200.png"
    },
    {
        name: "Lionel Messi3",
        img: "https://static.thenounproject.com/png/4156707-200.png"
    },
    {
        name: "Lionel Messi4",
        img: "https://static.thenounproject.com/png/4156707-200.png"
    },
    {
        name: "Lionel Messi5",
        img: "https://static.thenounproject.com/png/4156707-200.png"
    },
    {
        name: "Lionel Messi6",
        img: "https://static.thenounproject.com/png/4156707-200.png"
    },
    {
        name: "Lionel Messi7",
        img: "https://static.thenounproject.com/png/4156707-200.png"
    },
    {
        name: "Lionel Messi8",
        img: "https://static.thenounproject.com/png/4156707-200.png"
    },
    {
        name: "Lionel Messi9",
        img: "https://static.thenounproject.com/png/4156707-200.png"
    },
    {
        name: "Lionel Messi10",
        img: "https://static.thenounproject.com/png/4156707-200.png"
    },
    {
        name: "Lionel Messi11",
        img: "https://static.thenounproject.com/png/4156707-200.png"
    }
]