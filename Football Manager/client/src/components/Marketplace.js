import Axios from "axios";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.player_name}</td>
                        <td>{item.position}</td>
                        <td>{item.nationality}</td>
                        <td>{item.value}</td>
                        <td>
                            <a href="#" class="view" title="View" data-toggle="tooltip" style={{ color: "#10ab80" }}><i class="material-icons">&#xE417;</i></a>
                            <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                            <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{ color: "red" }}><i class="material-icons">&#xE872;</i></a>

                        </td>
                    </tr>
                ))}
        </>
    );
}

export function Marketplace({ itemsPerPage }) {

    const [team_name, setTeamName] = useState('');
    const [players, setPlayers] = useState([]);

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = players.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(players.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % players.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    useEffect(() => {
        const storedTeamName = localStorage.getItem('team_name');

        // Update state with the retrieved username
        if (storedTeamName) {
            setTeamName(storedTeamName);
        }

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

        <div class="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div class="row ">

                    <div class="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form class="form-inline">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search Student" aria-label="Search" />

                            </form>
                        </div>
                    </div>
                    <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Student Details</b></h2></div>
                    {/* <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShow}>
                            Add New Student
                        </Button>
                    </div> */}
                </div>
                <div class="row">
                    <div class="table-responsive " >
                        <table class="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name </th>
                                    <th>Position</th>
                                    <th>Nationality </th>
                                    <th>Value </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {/* {players.map((player, index) => (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{player.player_name}</td>
                                        <td>{player.position}</td>
                                        <td>{player.nationality}</td>
                                        <td>{player.value}</td>
                                        <td>
                                            <a href="#" class="view" title="View" data-toggle="tooltip" style={{ color: "#10ab80" }}><i class="material-icons">&#xE417;</i></a>
                                            <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                            <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{ color: "red" }}><i class="material-icons">&#xE872;</i></a>

                                        </td>
                                    </tr>
                                ))} */}
                                <Items currentItems={currentItems}/>

                            </tbody>
                        </table>
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination justify-content-center'}
                            pageClassname={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <Marketplace itemsPerPage={20} />,
    document.getElementById('root')
);

// export function Marketplace() {
//     const [team_name, setTeamName] = useState('');
//     const [players, setPlayers] = useState([]);

//     useEffect(() => {
//         // Retrieve username from localStorage
//         const storedTeamName = localStorage.getItem('team_name');

//         // Update state with the retrieved username
//         if (storedTeamName) {
//             setTeamName(storedTeamName);
//         }

//         // Run the retrievemarketplace function when the component mounts
//         Axios.post('http://localhost:3001/retreivemarketplace', {
//             team_name: team_name,
//         }).then((response) => {
//             console.log("Marketplace retrieved successfully !");
//             // Ensure response.data.player_name is defined before setting it in the state
//             if (response.data.player_name) {
//                 // Assuming all arrays have the same length and are synchronized
//                 const newPlayers = response.data.player_name.map((name, index) => ({
//                     player_name: name,
//                     position: response.data.position[index],
//                     nationality: response.data.nationality[index],
//                     value: response.data.value[index]
//                 }));
//                 setPlayers(newPlayers);
//             }
//         }).catch((error) => {
//             console.log("Some error occurred :(");
//         });

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [team_name]);

//     return (
//         <div className="marketplace">
//             <h1>{team_name}</h1>
//             <h1>MARKETPLACE</h1>
//             <ul>
//                 {players.map((player, index) => (
//                     <li key={index}>
//                         <strong>{player.player_name}</strong> - {player.position}, {player.nationality}, Value: {player.value}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }