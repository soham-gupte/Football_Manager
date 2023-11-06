const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root', 
    host: 'localhost',
    password: 'Vadi@2606',
    database: 'FootballDB'
});

app.post('/create', (req, res) => {
    const team_name = req.body.team_name;
    const password = req.body.password;
    const email = req.body.email;

    db.query('INSERT INTO Teams (team_name, password, email, budget) VALUES(?,?,?,10)', 
    [team_name, password, email], 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values Inserted");
        }
    })
})

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
                if (password === storedPassword) {
                    // Passwords match, you can consider it a successful login
                    res.send({data:"Login Successful"});
                } else {
                    // Passwords do not match
                    res.status(401).send("Invalid Password");
                }
            } else {
                // No user found with the given team_name
                res.status(404).send("User not found");
            }
        }
    });
});

app.post('/main', (req, res) => {
    const team_name = req.body.team_name;


});

app.listen(3001, () => {
    console.log("SERVER IS RUNNING ON PORT 3001")
})