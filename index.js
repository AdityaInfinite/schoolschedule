const { request, response } = require('express');
const express = require('express');
'use strict';

const fs = require('fs');
const Datastore = require('nedb');

const database = new Datastore('database.db');
database.loadDatabase();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('pub/'));
app.use(express.json());

let rawdata = fs.readFileSync('classes.json');
let classes = JSON.parse(rawdata);

app.post('/getdata', (request, response) => {
    var date = new Date()
    var MyTimestamp = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    request.body.timestamp = MyTimestamp;
    database.insert(request.body);
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
app.get('/logs', (request, response) => {
    database.find({}, (err, data) => {
      if (err) {
          console.log(err);
        response.end();
        return;
      }
      response.json(data);
    });
});
app.get('/new',(request,response) => {
    response.sendFile(`${__dirname.replace(/\\/g,"/")}/pub/newTable/index.html`)
});

