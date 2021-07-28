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
        case "A9":
            TimeTable = classes.A9;
            break;
		case "B9":
			TimeTable = classes.B9;
			break;
		case "C9":
			TimeTable = classes.C9;
			break;
		case "D9":
			TimeTable = classes.D9;
			break;
		case "B10":
			TimeTable = classes.B10;
			break;
		case "C10":
			TimeTable = classes.C10;
			break;
		case "D10":
			TimeTable = classes.D10;
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
app.get('/api', (request, response) => {
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
app.post('/addlog', (request, response) => {
	console.log("got a log")
	console.log(request.body);
	response.json({
        status: "success"
    });
    response.end();
	console.log("logged it!");
});
app.post('/newid', (request, response) => {
	console.log("got a id request")
	response.json({
        id: "69"
    });
    response.end();
	console.log("logged it!");
});