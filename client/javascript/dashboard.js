$(document).ready(function() {
	for(var i = 1; i <= 12; i++) {
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

// returns the table to contain this query's result.
function getTable(id) {
	var div = document.getElementById('Q' + id);
	if(div.children.length > 1) {
		var select = div.children[0];
		select.onchange = function() {getQuery(id)};
		return div.children[1];
	}
	return div.children[0];
}

// returns the value of the select block for this query.
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
			
			if(property === 'IsPublic') {
				var bool = rows[i][property];
				if(bool === 1) {
					column.innerHTML = 'yes';
				}
				else {
					column.innerHTML = 'no';
				}
				
			}
			else {
				column.innerHTML = rows[i][property];
			}
			tr.appendChild(column);
		}
		new_tbody.appendChild(tr);
	}

	table.replaceChild(new_tbody, table.children[1]);
}