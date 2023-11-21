import { useState, useEffect } from "react";
import Axios from "axios";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

function acceptRequest(playerName, fromTeam, reqID, team_name) {
    console.log(playerName, fromTeam, reqID, team_name);
    Axios.post('http://localhost:3001/acceptrequest', {
        player_name: playerName,
        requestingTeam: fromTeam,
        req_id: reqID,
        team_name: team_name,
    }).then((response) => {
        console.log("Player trade successful");
      
      })
      .catch((error) => {
          console.log("Error : ", error);
      });
}

function Items({ requestID, fromTeam, player, value, team_name }) {
    return (
        <>
            {requestID &&
                requestID.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item}</td>
                        <td>{fromTeam[index]}</td>
                        <td>{player[index]}</td>
                        <td>{value[index]}</td>
                        <td>
                        {/* <a href="/main" className="edit" title="Edit" data-toggle="tooltip" onClick={() => handleEditClick(item.player_name)}><FaRegThumbsDown /></a> */}
                        <a href="/main" className="edit" title="Edit" data-toggle="tooltip" onClick={() => acceptRequest(player[index], fromTeam[index], item, team_name)}><FaRegThumbsUp /></a>
                        </td>
                    </tr>
                ))}
        </>
    );
}

export function Notifications() {
    // Use useState to manage the team_name value
    const [teamName, setTeamName] = useState("");
    // const [transfers, setTransfers] = useState([]);
    const [requestID, setrequestID] = useState([]);
    const [fromTeam, setfromTeam] = useState([]);
    const [player, setplayer] = useState([]);
    const [value, setvalue] = useState([]);
    // const [transferId, seTtransferId] = useState([]);

    useEffect(() => {
        // Retrieve team_name from localStorage
        const storedTeamName = localStorage.getItem('team_name');

        if (storedTeamName) {
            // Update the team_name using setTeamName
            setTeamName(storedTeamName);

            Axios.post('http://localhost:3001/retreivenotifications', {
                team_name: storedTeamName,
            }).then((response) => {
                console.log("Data received:", response.data);
                // setTransferIDs(response.data.data)
                if (response.data.req_id.length > 0) {
                    console.log("Im here");
                    setrequestID(response.data.req_id);
                    setfromTeam(response.data.requester);
                    setplayer(response.data.player_name);
                    setvalue(response.data.player_value);
                    // seTtransferId(response.data.transfer_id);
                }
            }).catch((error) => {
                console.log("Error occured : ", error);
            });
        }
    }, [teamName]);

    return (
        <div class="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div class="row ">

                    <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Transactions</b></h2></div>

                </div>
                <div class="row">
                    <div class="table-responsive " >
                        <table class="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Request ID</th>
                                    <th>From Team</th>
                                    <th>Player</th>
                                    <th>Value</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Items requestID={requestID}
                                    fromTeam={fromTeam}
                                    player={player}
                                    value={value}
                                    team_name={teamName}
                                    />
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}