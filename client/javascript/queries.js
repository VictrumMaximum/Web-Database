function getTodos() {
	var setTodos = function(json) {
		var list = JSON.parse(json.todos);
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			if(!contains(todos, item)) {
				todos.push(new TodoItem(
					item.name,
					(item.date? new TodoDate(item.date.day, item.date.month, item.date.year) : null),
					item.desc,
					(item.remind? new TodoDate(item.remind.day, item.remind.month, item.remind.year) : null),
					item.rating,
					item.done
				));
			}
		}
		var toRemove = [];
		for(var i = 0; i < todos.length; i++) {
			var item = todos[i];
			if(!contains(list, item)) {
				toRemove.push(i);
			}
		}
		for(var i = toRemove.length - 1; i >= 0; i--) {
			todos.splice(toRemove[i], 1);
		}
		addTodosToHTML();
		emptyListHTML();
	}
	
	$.getJSON("http://localhost:3000/get-todos", setTodos);
}

function contains(list, item) {
	for(var i = 0; i < list.length; i++) {
		var comp = list[i];
		if(item.name === comp.name
				&& item.date.day === comp.date.day
				&& item.date.month === comp.date.month
				&& item.date.month === comp.date.month
				&& item.desc === comp.desc
				&& item.rating === comp.rating
				&& item.done === comp.done) {
			return true;
		}
	}
	return false;
}

function sendTodo(item) {
	$.ajax
		({
			type: "POST",
			url: "http://localhost:3000/add-todo",
			dataType: "json",
			ContentType: "application/json",			
			data: {'item': JSON.stringify(item)},
			success: function(data) {console.log(data.success);}
		});
}

function sendTodos() {
	if(todos.length < 1) {
		return;
	}
	
	$.ajax
		({
			type: "POST",
			url: "http://localhost:3000/set-todo",
			dataType: "json",
			ContentType: "application/json",			
			data: {'list': JSON.stringify(todos)},
			success: function(data) {console.log(data.success);}
		});
}

function removeTodo(item) {
	$.ajax
		({
			type: "POST",
			url: "http://localhost:3000/remove-todo",
			dataType: "json",
			ContentType: "application/json",			
			data: {'item': JSON.stringify(item)},
			success: function(data) {console.log(data.success);}
		});
}
