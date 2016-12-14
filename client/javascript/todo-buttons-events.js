function doneItem(doneButton) {
	var item = doneButton.parentNode.parentNode;
	
	var iterator = doneButton.parentNode.parentNode;
	
	var i = 0;
	while(iterator.previousSibling != null) {
		iterator = iterator.previousSibling;
		i++;
	}
	
	if(!todos[i].done) {
		todos[i].done = true;
		$.ajax
		({
			type: "POST",
			url: "http://localhost:3000/done-todo",
			dataType: "json",
			ContentType: "application/json",			
			data: {'item': JSON.stringify(todos[i])},
			success: function(data) {console.log(data.success);}
		});
	}
	
	item.style.color = 'green';
	
	var buttonDiv = doneButton.parentNode;
	var buttons = buttonDiv.childNodes;
	var editButton = buttons[1];
	buttonDiv.removeChild(doneButton);
	buttonDiv.removeChild(editButton);
	
}

function removeItem(removeButton) {
	var item = removeButton.parentNode.parentNode;
	var iterator = removeButton.parentNode.parentNode;
	
	var i = 0;
	while(iterator.previousSibling != null) {
		iterator = iterator.previousSibling;
		i++;
	}
	deleteTodo(todos[i]);
	todos.splice(i, 1);
	document.getElementById('todo-list').removeChild(removeButton.parentNode.parentNode);
	emptyListHTML();
}