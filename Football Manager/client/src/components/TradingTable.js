import { Menu } from "./Menu";
import React from "react";
import ReactTable from "react-table";
import "../styles/TradingStyles.css";

export function TradingTable(props) {

    const columns = [
        {
            Header: "First Name",
            accessor: "first"
        },
        {
            Header: "Last Name",
            accessor: "last"
        },
        {
            Header: "Phone number",
            accessor: "phone"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Age",
            accessor: "age"
        },
        {
            Header: "Gender",
            accessor: "gender"
        }
    ];

    return (
        <div className="trading">
            <Menu />
            <div className="trading-content">
                {/* <h1>Trading App</h1>
                <label>
                    Enter username to trade with:
                    <input type="text"/>
                </label>
                <button>Check User</button> */}
                <ReactTable className="trading-table"
                    data={props.playerInfo}
                    columns={columns}
                    showPagination={false} />
                
            </div>
        </div>
    )
}

// export default Reacttable;
