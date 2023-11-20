const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root', 
    host: 'football.cn9livtjfzqg.ap-south-1.rds.amazonaws.com',
    password: 'password',
    database: 'FootballDB'
});

app.post('/create', (req, res) => {
    const team_name = req.body.team_name;
    const password = req.body.password;
    const email = req.body.email;
// 
    db.query('INSERT INTO Teams (team_name, password, email, budget) VALUES(?,?,?,10)', 
    [team_name, password, email], 
    (err, result) => {
        if (err) {
            console.log(err);
            if (err.code === 'ER_DUP_ENTRY') {
                // Duplicate entry error, team_name already exists
                res.status(409).send({ data: "Team name already exists" });
            } else {
                res.status(500).send("Internal Server Error");
            }
        } else {
            res.send({ data: "Values Inserted" });
        }
    });
});

app.post('/login', (req, res) => {
    const team_name = req.body.team_name;
    const password = req.body.password;

    db.query('SELECT * FROM Teams WHERE team_name = ?', [team_name], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            if (rows.length > 0) {
                const storedPassword = rows[0].password;
                const storedTeamName = rows[0].team_name;
                if (team_name != storedTeamName) {
                    res.send({data:"No user found"});
                }
                else if (team_name === storedTeamName) {
                    if (password === storedPassword) {
                        // Passwords match, you can consider it a successful login
                        res.send({data:"Login Successful"});
                    } else {
                        // Passwords do not match
                        res.status(401).send({data:"Invalid Password"});
                    }
                } else {
                    res.status(404).send({data:"User not found"});
                }
            }
        }
    });
});

app.post('/squad', (req, res) => {
    const team_name = req.body.team_name; // Assuming you send the team name in the request body

    // Fetch playing 11
    console.log("fetching squad info")
    const playing11Query = `
        SELECT Players.player_name
        FROM Squad
        JOIN Players ON Squad.player_id = Players.player_id
        JOIN Teams ON Squad.team_id = Teams.team_id
        WHERE Teams.team_name = ? AND Squad.isplay = 1;
    `;

    db.query(playing11Query, [team_name], (err1, playing11Rows) => {
        if (err1) {
            console.log(err1);
            res.status(500).send("Internal Server Error");
        } else {
            // Fetch substitutes
            const substitutesQuery = `
                SELECT Players.player_name
                FROM Squad
                JOIN Players ON Squad.player_id = Players.player_id
                JOIN Teams ON Squad.team_id = Teams.team_id
                WHERE Teams.team_name = ? AND Squad.isplay = 0;
            `;

            db.query(substitutesQuery, [team_name], (err2, substitutesRows) => {
                if (err2) {
                    console.log(err2);
                    res.status(500).send("Internal Server Error");
                } else {
                    const playing11Array = playing11Rows.map(row => row.player_name);
                    const substitutesArray = substitutesRows.map(row => row.player_name);

                    res.status(200).send({ playing11Array, substitutesArray });
                    console.log("squad info sent")
                }
            });
        }
    });
});

app.post('/handleSwap', (req, res) => {
    // const { team_name, player_name_playing11, player_name_substitute } = req.body;
    const team_name = req.body.team_name;
    const player_name_playing11 = req.body.player1;
    const player_name_substitute = req.body.player2;

    // Update is_play values in the Squad table for the players being swapped
    const updatePlaying11Query = `
        UPDATE Squad
        SET isplay = CASE
            WHEN player_id IN (SELECT player_id FROM Players WHERE player_name = ?) THEN 0
            WHEN player_id IN (SELECT player_id FROM Players WHERE player_name = ?) THEN 1
            ELSE isplay
        END
        WHERE team_id = (SELECT team_id FROM Teams WHERE team_name = ?);
    `;

    db.query(updatePlaying11Query, [player_name_playing11, player_name_substitute, team_name], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            // Check if any rows were affected (successful update)
            if (result.affectedRows > 0) {
                res.status(200).send("Swap successful");
            } else {
                res.status(404).send("Player not found or unable to swap");
            }
        }
    });
});

app.post('/handleSwap', (req, res) => {
    // const { team_name, player_name_playing11, player_name_substitute } = req.body;
    const team_name = req.body.team_name;
    const player_name_playing11 = req.body.player1;
    const player_name_substitute = req.body.player2;

    // Update is_play values in the Squad table for the players being swapped
    const updatePlaying11Query = `
        UPDATE Squad
        SET isplay = CASE
            WHEN player_id IN (SELECT player_id FROM Players WHERE player_name = ?) THEN 0
            WHEN player_id IN (SELECT player_id FROM Players WHERE player_name = ?) THEN 1
            ELSE isplay
        END
        WHERE team_id = (SELECT team_id FROM Teams WHERE team_name = ?);
    `;

    db.query(updatePlaying11Query, [player_name_playing11, player_name_substitute, team_name], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            // Check if any rows were affected (successful update)
            if (result.affectedRows > 0) {
                res.status(200).send("Swap successful");
            } else {
                res.status(404).send("Player not found or unable to swap");
            }
        }
    });
});

app.post('/transactionHistory', (req, res) => {
    const team_name = req.body.team_name;
    var team_id = "";
    var buyingTransferIDs = [];
    var boughtPlayerNames = [];
    var boughtPlayerValues = [];
    var soldPlayerNames = [];
    var soldPlayerValues = [];
    var dataToSend = {};
    console.log(team_name);
    db.query('SELECT team_id FROM Teams WHERE team_name = ?', [team_name], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            if (rows.length > 0) {
                team_id = rows[0].team_id;
                db.query('SELECT transfer_id FROM Transaction WHERE transfer_id IN (SELECT transfer_id FROM BuyingTeam WHERE team_id = ?)', [team_id], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Internal Server Error");
                    } else {
                        if (rows.length > 0) {
                            buyingTransferIDs = rows.map(row => row.transfer_id);
                            console.log(buyingTransferIDs);
                            db.query('SELECT player_name, value FROM Players WHERE player_id IN (SELECT player_id FROM SoldPlayer WHERE transfer_id IN (SELECT transfer_id FROM BuyingTeam WHERE team_id = ?));', [team_id], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send("Internal Server Error");
                                } else {
                                    if (rows.length > 0) {
                                        console.log("PLAYER NAMES = >>>> ", rows);
                                        boughtPlayerNames = rows.map(row => row.player_name);
                                        boughtPlayerValues = rows.map(row => row.value);
                                    } else {
                                        console.log("ABE YAAR");
                                    }
                                }
                            })
                            // res.send(buyingTransferIDs);
                        } else {
                            // res.send("Acchahhahah");
                            console.log("No players bought till now");
                        }
                    }
                })
                console.log(buyingTransferIDs);
                db.query('SELECT transfer_id FROM Transaction WHERE transfer_id IN (SELECT transfer_id FROM SellingTeam WHERE team_id = ?)', [team_id], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Internal Server Error");
                    } else {
                        if (rows.length > 0) {
                            const sellingTransferIDs = rows.map(row => row.transfer_id);
                            console.log(sellingTransferIDs);
                            db.query('SELECT player_name, value FROM Players WHERE player_id IN (SELECT player_id FROM SoldPlayer WHERE transfer_id IN (SELECT transfer_id FROM Transaction WHERE transfer_id IN (SELECT transfer_id FROM BuyingTeam WHERE team_id = ?)));', [team_id], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send("Internal Server Error");
                                } else {
                                    if (rows.length > 0) {
                                        soldPlayerNames = rows.map(row => row.player_name);
                                        soldPlayerValues = rows.map(row => row.value);
                                        dataToSend = {
                                            buyingTransferIDs: buyingTransferIDs,
                                            boughtPlayerNames: boughtPlayerNames,
                                            boughtPlayerValues: boughtPlayerValues,
                                            sellingTransferIDs: sellingTransferIDs,
                                            soldPlayerNames: soldPlayerNames,
                                            soldPlayerValues: soldPlayerValues
                                        };
                                        console.log(dataToSend);
                                        res.send(dataToSend);
                                    } else {
                                        console.log("ABE YAAR");
                                    }
                                }
                            })
                            // res.send(transferIDs);
                        } else {
                            dataToSend = {
                                buyingTransferIDs: buyingTransferIDs,
                                boughtPlayerNames: boughtPlayerNames,
                                boughtPlayerValues: boughtPlayerValues
                            };
                            res.send(dataToSend);
                        }
                    }
                })
            } else {
                console.log(team_name);
                console.log("abe bsdk");
            }
        }
    })
});

app.post(`/main`, (req, res) => {
    const team_name = req.params.team_name;
    res.send({ team_name: team_name });
});

app.post(`/transactionHistory`, (req, res) => {
    const team_name = req.body.team_name;
    console.log(team_name);
    db.query('SELECT team_id FROM Teams WHERE team_name = ?', [team_name], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            if (rows.length > 0) {
                const team_id = rows[0].team_id;
                db.query('SELECT transfer_id FROM Transaction WHERE transfer_id IN (SELECT transfer_id FROM BuyingTeam WHERE team_id = ?)', [team_id], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Internal Server Error");
                    } else {
                        if (rows.length > 0) {
                            const buyingTransferIDs = rows.map(row => row.transfer_id);
                            console.log(buyingTransferIDs);
                            db.query('SELECT player_name, value FROM Players WHERE player_id IN (SELECT player_id FROM SoldPlayer WHERE transfer_id IN (SELECT transfer_id FROM Transaction WHERE transfer_id IN (SELECT transfer_id FROM BuyingTeam WHERE team_id = ?)));', [team_id], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send("Internal Server Error");
                                } else {
                                    if (rows.length > 0) {
                                        const boughtPlayerNames = rows.map(row => row.player_name);
                                        const boughtPlayerValues = rows.map(row => row.value);
                                    } else {
                                        console.log("ABE YAAR");
                                    }
                                }
                            })
                            // res.send(transferIDs);
                        } else {
                            // res.send("Acchahhahah");
                        }
                    }
                })
                db.query('SELECT transfer_id FROM Transaction WHERE transfer_id IN (SELECT transfer_id FROM SellingTeam WHERE team_id = ?)', [team_id], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Internal Server Error");
                    } else {
                        if (rows.length > 0) {
                            const sellingTransferIDs = rows.map(row => row.transfer_id);
                            console.log(sellingTransferIDs);
                            db.query('SELECT player_name, value FROM Players WHERE player_id IN (SELECT player_id FROM SoldPlayer WHERE transfer_id IN (SELECT transfer_id FROM Transaction WHERE transfer_id IN (SELECT transfer_id FROM BuyingTeam WHERE team_id = ?)));', [team_id], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send("Internal Server Error");
                                } else {
                                    if (rows.length > 0) {
                                        const soldPlayerNames = rows.map(row => row.player_name);
                                        const soldPlayerValues = rows.map(row => row.value);
                                        const dataToSend = {
                                            buyingTransferIDs,
                                            boughtPlayerNames,
                                            boughtPlayerValues,
                                            sellingTransferIDs,
                                            soldPlayerNames,
                                            soldPlayerValues
                                        };
                                        res.send(dataToSend);
                                    } else {
                                        console.log("ABE YAAR");
                                    }
                                }
                            })
                            // res.send(transferIDs);
                        } else {
                            res.send("Acchahhahah");
                        }
                    }
                })
            } else {
                console.log(team_name);
                console.log("abe bsdk");
            }
        }
    })
});

app.post('/retreivemarketplace', (req, res) => {
    const team_name = req.body.team_name;
    const search_term = req.body.search_term;
    let sql = 'SELECT player_name, position, nationality, value FROM Players WHERE player_id in (SELECT player_id FROM Marketplace)';
    const params = [];
    if (search_term) {
        sql += ' AND player_name LIKE ?';
        params.push(`%${search_term}%`);
    }

    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);   
            res.status(500).send("Internal Server Error");
        } else {
            if (rows.length > 0) {
                const playerNames = rows.map(row => row.player_name);
                const position = rows.map(row => row.position);
                const nationality = rows.map(row => row.nationality);
                const value = rows.map(row => row.value);

                res.send({ player_name: playerNames, 
                        position: position, 
                        nationality: nationality,
                        value: value });
                console.log("player info sent");
            } else {
                res.send({ playerNames: [] });
            }
        }
    });
});

function givedate() {
    showdate = new Date();
    // displayTodaysdate = showdate.getFullYear()+'/'+showdate.getMonth()+'/'+showdate.getDate()+'/';
    hehe = showdate.toDateString();
    return hehe;
}

app.post('/buyplayer', (req, res) => {
    const team_name = req.body.team_name;
    const playerName = req.body.playerName;

    console.log(playerName);
    console.log(team_name);

    db.query('SELECT budget, team_id FROM Teams WHERE team_name = ?', [team_name], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(555).send("Internal Server Error");
        } else {
            if (rows.length > 0) {
                const budget = rows[0].budget;
                const team_id = rows[0].team_id;
                console.log(team_id);
                db.query('SELECT value, player_id FROM Players WHERE player_name = ?', [playerName], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(501).send("Internal Server Error");
                    } else {
                        if (rows.length > 0) {
                            const playerValue = rows[0].value;
                            const player_id = rows[0].player_id;
                            console.log(playerValue);
                            console.log(player_id);

                            if (budget < playerValue) {
                                res.send("Insufficient Balance");
                            } else {
                                db.query('SELECT count(player_id) FROM Squad WHERE team_id = (SELECT team_id FROM Teams WHERE team_name = ?)', [team_name], (err, rows) => {
                                    if (err) {
                                        console.log(err, playerValue);
                                        res.status(502).send("Internal Server Error");
                                    } else {
                                        if (rows.length > 0) {
                                            const numOfPlayers = rows[0].playerCount;

                                            if (numOfPlayers === 20) {
                                                res.send("Team is full !");
                                            } else {
                                                db.query('UPDATE Teams SET budget = budget - ? WHERE team_name = ?', [playerValue, team_name], (err, rows) => {
                                                    if (err) {
                                                        console.log(err);
                                                        res.status(503).send("Internal Server Error");
                                                    } else {
                                                        db.query('INSERT INTO Transaction (transfer_date) VALUES (?)', [givedate()], (err, result) => {
                                                            if (err) {
                                                                console.log(err);
                                                                res.status(503).send("Internal Server Error");
                                                            } else {
                                                                const transferId = result.insertId;

                                                                db.query('INSERT INTO BuyingTeam (transfer_id, team_id) VALUES (?, ?)', [transferId, team_id], (err, rows) => {
                                                                    if (err) {
                                                                        console.log(err);
                                                                        res.status(503).send("Internal Server Error");
                                                                    } else {
                                                                        db.query('INSERT INTO SoldPlayer (transfer_id, player_id) VALUES (?, ?)', [transferId, player_id], (err, rows) => {
                                                                            if (err) {
                                                                                console.log(err);
                                                                                res.status(503).send("Internal Server Error");
                                                                            } else {
                                                                                db.query('SELECT team_id FROM Marketplace WHERE player_id = ?', [player_id], (err, rows) => {
                                                                                    if (err) {
                                                                                        console.log(err);
                                                                                        res.status(503).send("Internal Server Error");
                                                                                    } else {
                                                                                        if (rows.length > 0) {
                                                                                            const fromTeam = rows[0].team_id;
                                                                                            if (fromTeam) {
                                                                                                db.query('INSERT INTO SellingTeam (transfer_id, team_id) VALUES (?, ?)', [transferId, fromTeam], (err, rows) => {
                                                                                                    if (err) {
                                                                                                        console.log(err);
                                                                                                        res.status(503).send("Internal Server Error");
                                                                                                    } else {
                                                                                                        db.query('UPDATE Squad SET team_id = ? WHERE (team_id = ?) and (player_id = ?)', [team_id, fromTeam, player_id], (err, rows) => {
                                                                                                            if (err) {
                                                                                                                console.log(err);
                                                                                                                res.status(504).send("Internal Server Error");
                                                                                                            } else {
                                                                                                                db.query('DELETE FROM Marketplace WHERE (player_id = ?)', [player_id], (err, rows) => {
                                                                                                                    if (err) {
                                                                                                                        console.log(err);
                                                                                                                        res.status(504).send("Internal Server Error");
                                                                                                                    } else {
                                                                                                                        db.query('UPDATE Teams SET budget = budget + ? WHERE (team_id = ?)', [playerValue, fromTeam], (err, rows) => {
                                                                                                                            if (err) {
                                                                                                                                console.log(err);
                                                                                                                                res.status(504).send("Internal Server Error");
                                                                                                                            } else {
                                                                                                                                console.log("DONE");
                                                                                                                            }
                                                                                                                        })
                                                                                                                        console.log("Transaction comnplete. Backend updated !");
                                                                                                                    }
                                                                                                                })
                                                                                                            }
                                                                                                        })
                                                                                                        console.log("Transaction successful !");
                                                                                                    }
                                                                                                })
                                                                                            } else {
                                                                                                db.query('INSERT INTO Squad (team_id, player_id, isplay) VALUES (?, ?, 0)', [team_id, player_id], (err, rows) => {
                                                                                                    if (err) {
                                                                                                        console.log(err);
                                                                                                        res.status(504).send("Internal Server Error");
                                                                                                    } else {
                                                                                                        db.query('DELETE FROM Marketplace WHERE (player_id = ?)', [player_id], (err, rows) => {
                                                                                                            if (err) {
                                                                                                                console.log(err);
                                                                                                                res.status(504).send("Internal Server Error");
                                                                                                            } else {
                                                                                                                console.log("Transaction comnplete. Backend updated !");
                                                                                                            }
                                                                                                        })
                                                                                                    }
                                                                                                })
                                                                                                
                                                                                                console.log("Transaction successful (without from team)!");
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    }
                })
            }
        }
    });
})

app.post('/marketplace', (req, res) => {
    const team_name = req.body.team_name;
});

app.listen(3001, () => {
    console.log("SERVER IS RUNNING ON PORT 3001")
})