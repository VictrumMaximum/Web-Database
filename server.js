var express = require("express");
var http = require("http");
var mysql = require("mysql");
var port = 3000;
var app = express();

var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "webdata",
	database : "todo"
});

connection.connect();
//test

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/client"));

var todos = [];

app.get("/todo", function(req, res) {
	res.sendFile(__dirname + "/client/html/todo.html");
});

app.get("/get-todos", function(req, res) {
	res.json({'todos' : JSON.stringify(todos)});
});

app.post("/set-todo", function(req, res) {
	var list = JSON.parse(req.body.list);
	todos = list;
	res.json({success : true});
});

app.post("/add-todo", function(req, res) {
	if(req.body.item) {
		var item = JSON.parse(req.body.item);
		todos.push(item);
		res.json({success : true});
	}
	else {
		res.json({success : false});
	}
});

app.post("/remove-todo", function(req, res) {
	if(req.body) {
		var item = JSON.parse(req.body.item);
		for(var i = 0; i < todos.length; i++) {
			var comp = todos[i];
			if(item.name == comp.name
				&& item.date.day == comp.date.day
				&& item.date.month == comp.date.month
				&& item.date.month == comp.date.month
				&& item.desc == comp.desc) {
				todos.splice(i, 1);
				break;
			}
		}
		res.json({success : true});
	}
	else {
		res.json({succes : false});
	}
});

app.post("/done-todo", function(req, res) {
	var item = JSON.parse(req.body.item);
	for(var i = 0; i < todos.length; i++) {
			var comp = todos[i];
			if(item.name == comp.name
				&& item.date.day == comp.date.day
				&& item.date.month == comp.date.month
				&& item.date.month == comp.date.month
				&& item.desc == comp.desc) {
				todos[i].done = true;
				break;
			}
		}
		res.json({success : true});
});

http.createServer(app).listen(port);
console.log("listening at port " + port);