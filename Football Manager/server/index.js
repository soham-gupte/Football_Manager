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

// app.post('/create', (req, res) => {
//     const team_name = req.body.team_name;
//     const password = req.body.password;
//     const email = req.body.email;
// // 
//     db.query('INSERT INTO Teams (team_name, password, email, budget) VALUES(?,?,?,10)', 
//     [team_name, password, email], 
//     (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.send("Values Inserted");
//         }
//     })
// })

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

app.post(`/main`, (req, res) => {
    const team_name = req.params.team_name;
    res.send({ team_name: team_name });
});

app.post('/marketplace', (req, res) => {
    const team_name = req.body.team_name;

    
});

app.listen(3001, () => {
    console.log("SERVER IS RUNNING ON PORT 3001")
})