/*
	To add myuser:
	INSERT INTO User(Id, Name, Email, Username, Password) VALUES ("myuser", "myuser@to.do", "myuser", "mypass");

	To add Mylist:
	INSERT INTO ToDoList(Name, CreationDate, Owner, IsPublic) VALUES ("MyList", "2016-01-01 00:00:00", "3", "0");
*/

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


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/client"));

var todos = [];

app.get("/todo", function(req, res) {
	res.sendFile(__dirname + "/client/html/todo.html");
});

app.get("/testdb", function(req, res) {
	var id = req.query.id;

	connection.query("SELECT Title, Text, DueDate, Completed, Priority"
		+ " FROM ToDoItem JOIN ToDoList ON ToDoItem.ToDoListID=ToDoList.Id"
		+ " WHERE ToDoList.Owner="+id, function(err, rows, fields) {
		if (err) {
			console.log(err);
		}
		else {
			res.json({'rows' : JSON.stringify(rows)});
		}
	});
});

app.post("/add-db", function(req, res) {

	var id = req.body.id;
	var item = JSON.parse(req.body.item);

	var getItems = function(listID) {
		var date = item.date;
		connection.query("INSERT INTO ToDoItem(Title, Text, DueDate, Completed, Priority, ToDoListID)"
			+ " VALUES (\""+item.name+"\", \""+item.desc+"\", \""+date.year+"-"+date.month+"-"+date.day+ " 00:00:00\","
			+ " \"0\", \""+item.rating+"\", \""+listID+"\")",
			function(err, rows, fields) {

				if (err) {
					console.log(err);
				}
				else {
					// console.log(rows);
					res.json({'success' : true});
				}
		});
	}

	connection.query("SELECT Id"
		+ " FROM ToDoList"
		+ " WHERE ToDoList.Owner=" + id, 
		function(err, rows, fields) {

			if (err) {
				console.log(err);
			}
			else {
				var listID = rows[0].Id;
				//console.log(listID);
				getItems(listID);
			}
		});
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
