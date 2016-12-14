function sortDate() {
	todos.sort(function(a, b){
		return new Date(a.date.year, a.date.month, a.date.day, 0, 0, 0, 0) - new Date(b.date.year, b.date.month, b.date.day, 0, 0, 0, 0);
	});
	addTodosToHTML();
}

function sortRating() {
	todos.sort(function(a, b){
		return b.rating - a.rating;
	});
	addTodosToHTML();
}