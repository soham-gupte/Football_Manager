import { useState, useEffect } from "react";
import Axios from "axios";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

function Items({ buyingTeam, playerNames, sellingTeam, transferDate, transferId }) {
    return (
        <>
            {transferId &&
                transferId.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item}</td>
                        <td>{transferDate[index]}</td>
                        <td>{buyingTeam[index]}</td>
                        <td>{sellingTeam[index]}</td>
                        <td>{playerNames[index]}</td>
                    </tr>
                ))}
        </>
    );
}

export function Transaction() {
    // Use useState to manage the team_name value
    const [teamName, setTeamName] = useState("");
    // const [transfers, setTransfers] = useState([]);
    const [buyingTeam, setBuyingTeam] = useState([]);
    const [playerNames, setPlayerNames] = useState([]);
    const [sellingTeam, setSellingTeam] = useState([]);
    const [transferDate, setTransferDate] = useState([]);
    const [transferId, seTtransferId] = useState([]);

    useEffect(() => {
        // Retrieve team_name from localStorage
        const storedTeamName = localStorage.getItem('team_name');

        if (storedTeamName) {
            // Update the team_name using setTeamName
            setTeamName(storedTeamName);

            Axios.post('http://localhost:3001/transactionHistory', {
                team_name: storedTeamName,
            }).then((response) => {
                console.log("Data received:", response.data);
                // setTransferIDs(response.data.data)
                if (response.data.transfer_id.length > 0) {
                    console.log("Im here");
                    setBuyingTeam(response.data.buying_team);
                    setPlayerNames(response.data.player_name);
                    setSellingTeam(response.data.selling_team);
                    setTransferDate(response.data.transfer_date);
                    seTtransferId(response.data.transfer_id);
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
                                    <th>Transaction ID </th>
                                    <th>Date</th>
                                    <th>Buyer </th>
                                    <th>Seller </th>
                                    <th>Player</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Items buyingTeam={buyingTeam}
                                    playerNames={playerNames}
                                    sellingTeam={sellingTeam}
                                    transferDate={transferDate}
                                    transferId={transferId} />
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}