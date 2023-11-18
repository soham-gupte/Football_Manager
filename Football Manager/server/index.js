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


app.post(`/main`, (req, res) => {
    const team_name = req.params.team_name;
    res.send({ team_name: team_name });
});

app.post('/retreivemarketplace', (req, res) => {
    const team_name = req.body.team_name;
    const search_term = req.body.search_term;
    let sql = 'SELECT player_name, position, nationality, value FROM Players WHERE player_id NOT IN (SELECT player_id FROM Squad)';
    let sql = 'SELECT player_name, position, nationality, value FROM Players WHERE player_id NOT IN (SELECT player_id FROM Squad)';
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
                console.log("player info sent")
            } else {
                res.send({ playerNames: [] });
            }
        }
    });
});

app.post('/marketplace', (req, res) => {
    const team_name = req.body.team_name;

    
});


app.listen(3001, () => {
    console.log("SERVER IS RUNNING ON PORT 3001")
})