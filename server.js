/*
	To add myuser:
	INSERT INTO User(Id, Name, Email, Username, Password) VALUES ("myuser", "myuser@to.do", "myuser", "mypass");

	To add Mylist:
	INSERT INTO ToDoList(Name, CreationDate, Owner, IsPublic) VALUES ("MyList", "2016-01-01 00:00:00", "3", "0");
*/
// comment

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

app.get("/get-todos", function(req, res) {
	var id = req.query.id;

	connection.query("SELECT ToDoItem.Id, Title, Text, DueDate, Completed, Priority"
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

app.post("/add-todo", function(req, res) {

	var userID = req.body.id;
	var item = JSON.parse(req.body.item);

	var returnID = function() {
		connection.query("SELECT LAST_INSERT_ID() FROM ToDoItem",
			function(err, rows, fields) {
				res.json({'itemID' : rows[0]['LAST_INSERT_ID()']});
			});
	}

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
					returnID();
				}
		});
	}

	connection.query("SELECT Id"
		+ " FROM ToDoList"
		+ " WHERE ToDoList.Owner=" + userID, 
		function(err, rows, fields) {

			if (err) {
				console.log(err);
				res.json({'success' : false});
			}
			else {
				var listID = rows[0].Id;
				getItems(listID);
			}
		});
});

app.post("/delete-todo", function(req, res) {
	var itemID = req.body.itemID;
	var success = false;

	connection.query("DELETE FROM ItemTag"
		+ " WHERE ItemTag.ToDoId=\"" + itemID + "\"",
		function(err, rows, fields) {
			if (err) {
					console.log(err);
			}
			else {
				success = true;
			}
		});

	connection.query("DELETE FROM ToDoItem"
		+ " WHERE ToDoItem.Id=\"" + itemID + "\"",
		function(err, rows, fields) {
			if (err) {
					console.log(err);
					success = false;
			}
			else {
				success = true;
			}
		});
	res.json({'success' : success});
});

app.post("/done-todo", function(req, res) {
	connection.query("UPDATE ToDoItem"
		+ " SET ToDoItem.Completed=\"1\"", function(err, rows, fields) {
			if (err) {
				console.log(err);
				res.json({'success' : false});
			}
			else {
				res.json({'success' : true});
			}
	});
});

app.get("/dashboard", function(req, res) {
	res.sendFile(__dirname + "/client/html/dashboard.html");
});

app.get("/Q1", function(req, res) {
	var id = req.query.id;

	connection.query("SELECT * FROM ToDoList WHERE ToDoList.Owner=\"" + id + "\"",
		function(err, rows, fields) {
			if (err) {
					console.log(err);
			}
			else {
				res.json({'rows' : JSON.stringify(rows)});
			}
		});
});

app.get("/Q2", function(req, res) {
	var id = req.query.id;

	connection.query("SELECT * FROM ToDoItem WHERE ToDoItem.ToDoListID=\"" + id + "\"",
		function(err, rows, fields) {
			if (err) {
					console.log(err);
			}
			else {
				res.json({'rows' : JSON.stringify(rows)});
			}
		});
});

app.get("/Q3", function(req, res) {
	var id = req.query.id;

	connection.query("SELECT * FROM ToDoItem WHERE ToDoItem.ToDoListID=\"" + id + "\" LIMIT 3,7",
		function(err, rows, fields) {
			if (err) {
					console.log(err);
			}
			else {
				res.json({'rows' : JSON.stringify(rows)});
			}
		});
});

app.get("/Q4", function(req, res) {
	/*
	connection.query("",
		function(err, rows, fields) {
			if (err) {
					console.log(err);
			}
			else {
				res.json({'rows' : JSON.stringify(rows)});
			}
		});
		*/
		res.json({'rows' : JSON.stringify({'todo' : 'todo'})});
});


app.get("/Q5", function(req, res) {
	var id = req.query.id;

	connection.query("SELECT * FROM ToDoItem WHERE ToDoItem.ParentToDo=\"" + id + "\"",
		function(err, rows, fields) {
			if (err) {
					console.log(err);
			}
			else {
				res.json({'rows' : JSON.stringify(rows)});
			}
		});
});

app.get("/Q6", function(req, res) {
	var id = req.query.id;

	connection.query("SELECT Text FROM ItemTag join Tag ON ItemTag.TagId=Tag.Id WHERE ItemTag.ToDoId=\"" + id + "\"",
		function(err, rows, fields) {
			if (err) {
					console.log(err);
			}
			else {
				res.json({'rows' : JSON.stringify(rows)});
			}
		});
});

app.get("/Q7", function(req, res) {
	var id = req.query.id;

	connection.query("SELECT distinct Name"
		+ " FROM Tag join ItemTag on Tag.Id=ItemTag.TagId"
		+ " JOIN ToDoItem ON ToDoItem.Id=ItemTag.ToDoId"
		+ " JOIN ToDoList ON ToDoItem.ToDoListId=ToDoList.Id"
		+ " WHERE Tag.Id=\"" + id + "\"",
		function(err, rows, fields) {

		});
});

app.get("/Q8", function(req, res) {
	connection.query("",
		function(err, rows, fields) {

		});
});

app.get("/Q9", function(req, res) {
	connection.query("",
		function(err, rows, fields) {

		});
});

app.get("/Q10", function(req, res) {
	connection.query("",
		function(err, rows, fields) {

		});
});

app.get("/Q11", function(req, res) {
	connection.query("",
		function(err, rows, fields) {

		});
});

app.get("/Q12", function(req, res) {
	connection.query("",
		function(err, rows, fields) {

		});
});

http.createServer(app).listen(port);
console.log("listening at port " + port);
