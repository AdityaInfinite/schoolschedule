const { request, response } = require('express');
const express = require('express');
const fetch = require('node-fetch');
'use strict';

const fs = require('fs');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public/'));
app.use(express.json());

// const database = new Datastore('database.db');
// database.loadDatabase();
let rawdata = fs.readFileSync('classes.json');
let classes = JSON.parse(rawdata);
// console.log(classes.A8);


app.post('/api', (request, response) => {
    var date = new Date()
    var MyTimestamp = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    request.body.timestamp = MyTimestamp;
    const Class = request.body.Class;
    var TimeTable
    switch (Class) {
        case "A8":
            TimeTable = classes.A8;
            break;
        case "B7":
            TimeTable = classes.B7;
            break;
        default:
            break;
    }
    console.log(Class);
    response.json({
        timeTable: TimeTable,
        status: "success"
    });
    response.end();
});
