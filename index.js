const { request, response } = require('express');
const express = require('express');
'use strict';

const fs = require('fs');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('pub/'));
app.use(express.json());

let rawdata = fs.readFileSync('classes.json');
let classes = JSON.parse(rawdata);

app.post('/getdata', (request, response) => {
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
app.get('/api',(request,response) => {
    response.json(classes);
    response.end();
});

