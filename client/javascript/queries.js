function getTodos() {
	var rows;

		var addTodos = function(rows) {
			todos = [];
			for(var i = 0; i < rows.length; i++) {
				var item = rows[i];

				todos.push(new TodoItem(
					item.Title,
					(item.DueDate? new TodoDate(item.DueDate.substring(8, 9), item.DueDate.substring(5, 6), item.DueDate.substring(0, 3)) : null),
					item.Text,
					(item.remind? new TodoDate(item.remind.day, item.remind.month, item.remind.year) : null),
					item.Priority,
					item.Completed
				));
			}
			addTodosToHTML();
		}

		$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/testdb",
			dataType: "json",
			ContentType: "application/json",			
			data: {'id': 3},
			success: function(data) {
				rows = JSON.parse(data.rows);
				addTodos(rows);
				// console.log("retrieved items");
			}
		});
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