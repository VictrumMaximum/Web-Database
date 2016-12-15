function getTodos() {
	var rows;

		var addTodos = function() {
			for(var i = 0; i < rows.length; i++) {
				var item = rows[i];

				// if item already in memory, continue to next iteration
				if(contains(item.Id)) {
					continue;
				}

				var item = new TodoItem(
					item.Id,
					item.Title,
					(item.DueDate? new TodoDate(item.DueDate.substring(8, 10), item.DueDate.substring(5, 7), item.DueDate.substring(0, 4)) : null),
					item.Text,
					(item.remind? new TodoDate(item.remind.day, item.remind.month, item.remind.year) : null),
					item.Priority,
					item.Completed
				);

				todos.push(item);
				addItemHTML(item);
				emptyListHTML();	// toggles the empty list display mode
			}
		}

		var removeTodos = function() {
			for(var i = 0; i < todos.length; i++) {
				var id = todos[i].id;

				// if item from memory does not exist in query, remove it
				if(!inQuery(rows, id)) {
					todos.splice(i, 1);
					removeHTML(id);
					i--;
				}
			}
			emptyListHTML();	// toggles the empty list display mode
		}

		$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/get-todos",
			dataType: "json",
			ContentType: "application/json",			
			data: {'id': userID},
			success: function(data) {
				rows = JSON.parse(data.rows);
				addTodos();
				removeTodos();
				// console.log("retrieved items");
			}
		});
}

function sendTodo(item) {
	$.ajax
	({
		type: "POST",
		url: "http://localhost:3000/add-todo",
		dataType: "json",
		ContentType: "application/json",			
		data: {'id' : userID, 'item' : JSON.stringify(item)},
		success: function(data) {
			if(data.itemID) {
				item.id = data.itemID;
				todos.push(item);
				addItemHTML(item);
				emptyListHTML();	// toggles the empty list display mode
				clearForm();
			}
			else {
				alert("server error");
			}
		}
	});
}

function deleteTodo(deleteID) {
	$.ajax
	({
		type: "POST",
		url: "http://localhost:3000/delete-todo",
		dataType: "json",
		ContentType: "application/json",			
		data: {'itemID' : deleteID},
		success: function(data) {
			removeHTML(deleteID);
			for(var i = 0; i < todos.length; i++) {
				var id = todos[i].id;

				if(id === deleteID) {
					todos.splice(i, 1);
					break;
				}
			}
		}
	});
}

function removeHTML(id) {
	var list = document.getElementById("todo-list");
	var children = list.children;

	for (var i = 0; i < children.length; i++) {
		if(parseInt(children[i].id) === id) {
			list.removeChild(children[i]);
			break;
		}
	}
	emptyListHTML();
}

function inQuery(rows, id) {
	for(var i = 0; i < rows.length; i++) {
		if(rows[i].Id === id) {
			return true;
		}
	}
	return false;
}

function contains(id) {
	for(var i = 0; i < todos.length; i++) {
		if(todos[i].id === id) {
			return true;
		}
	}
	return false;
}