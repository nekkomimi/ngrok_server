const express = require('express');
const path = require('path');
const cors = require('cors');
const { urlencoded } = require('express');
const {Client, Pool} = require('pg');
const port = 3000;
const app = express();


app.use(cors())
app.use(express.urlencoded({extended: true}));
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: 'nekkomimi',
    port: 5432
})

pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get('/', (req, res)=>{
    res.send('TEST HEROKU DEPLOY');
});

app.get('/getPostgres', (req, res)=>{
    pool.query(
        'SELECT * FROM user_data',
        (error, results)=>{
            res.json({response: results.rows})
        }
    )
})


app.listen(port);