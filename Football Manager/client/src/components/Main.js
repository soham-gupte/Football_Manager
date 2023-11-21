import React, { useEffect, useState } from 'react';
import "../styles/MainStyles.css"
import { Menu } from './Menu';
import axios from 'axios'; // Import Axios
import { FaAnglesDown } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import { MdSell } from "react-icons/md";
import { GiTrade } from "react-icons/gi";
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { InputGroup, Form } from 'react-bootstrap';

export function Main() {

    const [playing11Array, setPlaying11Array] = useState([]);
    const [substitutesArray, setSubstitutesArray] = useState([]);

    const [selectedElementA, setSelectedElementA] = useState(null);
    const handleSelectA = (indexA) => {
        // Set the selected element from array A
        setSelectedElementA(indexA);

    };

    const handleSwap = (indexB, team_name) => {
        if (selectedElementA !== null) {
            // Create copies of the arrays
            const newArrayA = [...playing11Array];
            const newArrayB = [...substitutesArray];

            // Swap elements
            const temp = newArrayA[selectedElementA];
            newArrayA[selectedElementA] = newArrayB[indexB];
            newArrayB[indexB] = temp;

            // Update state with the new arrays and reset selectedElementA
            setPlaying11Array(newArrayA);
            setSubstitutesArray(newArrayB);
            setSelectedElementA(null);
            console.log("player1 swapped: ",newArrayA[selectedElementA].name);
            console.log("player2 swapped: ",temp.name);
            axios.post('http://localhost:3001/handleSwap', { 
                team_name: team_name, 
                player1: temp.name,
                player2: (newArrayA[selectedElementA].name),
        })
        }
    };

    useEffect(() => {
        // Fetch team_name from localStorage
        const team_name = localStorage.getItem('team_name');

        // Fetch data from server if teamName exists
        if (team_name) {
            axios.post('http://localhost:3001/squad', { team_name })
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

    // For Modal pop-up
    const [show, setShow] = useState(false);
    const [modalName, setModalName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = (name) => {
        setShow(true);
        setModalName(name);
    }

    // For Modal pop-up
    const [show1, setShow1] = useState(false);
    const [modalName1, setModalName1] = useState('');

    function confirmSell(name){
        handleClose1();
        console.log("selling ", name)
        axios.post('http://localhost:3001/listOnMarketplace', { 
            player_name: name,
            team_name : localStorage.getItem('team_name'),
        })
    }

    const handleClose1 = () => setShow1(false);

    //to list a player in the marketplace
    const handleShow1 = (name) => {
        setShow1(true);
        setModalName1(name);
    }

    return (

        <div className="main">
            <Menu />
            <div className="all-players">
                {/* <div className='modal-class'>
                    
                </div> */}
                <h1>Playing 11</h1>
                <div className="player-content">
                    {playing11Array.map((item, index) => {
                        return (
                            <div className="player-card">
                                <div className="player-card-body">
                                    <img src={item.img} alt="" />
                                    <h2 className="player-card-title">{item.name}</h2>
                                </div>
                                <Button variant="primary" onClick={() => handleSelectA(index)}><FaAnglesDown /></Button>
                            </div>
                        )
                    })}
                </div>
                <h1>Substitutes</h1>
                <div className='modal-class'>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Player Trading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Please search for the club you wish to trade {modalName} with:
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Default
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary">Confirm</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={show1}
                        onHide={handleClose1}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Sale?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to put {modalName1} on the marketplace for sale?
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose1}>
                                NO
                            </Button>
                            <Button variant="primary" onClick={() => confirmSell(modalName1)}>YES</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="player-content">
                    {substitutesArray.map((item, index) => {
                        return (
                            <div className="player-card">
                                <div className="player-card-body">
                                    <img src={item.img} alt="" />
                                    <h2 className="player-card-title">{item.name}</h2>
                                </div>

                                <Button className="subs-btn" variant="primary" onClick={() => handleSwap(index, localStorage.getItem('team_name'))}><FaAnglesUp /></Button>
                                <Button className="subs-btn" variant="primary" onClick={() => handleShow1(item.name)}>Sell <MdSell /></Button>
                                <Button className="subs-btn" variant="primary" onClick={() => handleShow(item.name)}>Trade <GiTrade /></Button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
