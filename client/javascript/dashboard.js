$(document).ready(function() {
	for(var i = 1; i <= 7; i++) {
		getQuery(i);
	}
});

function getQuery(id) {
	var value = getValue(id);

	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q" + id,
			dataType: "json",
			ContentType: "application/json",
			data: {"id" : value},
			success: function(data) {
				rows = JSON.parse(data.rows);
				console.log('query ' + id);
				console.log(rows);

				addToTable(id, rows);
			}
		});
}

function getTable(id) {
	var div = document.getElementById('Q' + id);
	var select = div.children[0];
	select.onchange = function() {getQuery(id)};
	var table = div.children[1];

	return table;
}

function getValue(id) {
	return document.getElementById('Q' + id).children[0].value;
}

function addToTable(id, rows) {
	var table = getTable(id);
	var new_tbody = document.createElement('tbody');

	for(var i = 0; i < rows.length; i++) {
		var tr = document.createElement('tr');

		for (var property in rows[i]) {
			var column = document.createElement('td');
			column.innerHTML = rows[i][property];
			tr.appendChild(column);
		}
		new_tbody.appendChild(tr);
	}

	table.replaceChild(new_tbody, table.children[1]);
}