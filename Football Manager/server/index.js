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

app.listen(3001, () => {
    console.log("SERVER IS RUNNING ON PORT 3001")
})