$(document).ready(function() {
	getQ1();
	/*
	getQ2();
	getQ3();
	getQ4();
	getQ5();
	getQ6();
	getQ7();
	getQ8();
	getQ9();
	getQ10();
	getQ11();
	getQ12();
	*/
});

function getQ1() {
	var div = document.getElementById('Q1');
	var select = div.children[0];
	select.onchange = function() {getQ1()};

	var table = div.children[1];
	var new_tbody = document.createElement('tbody');

	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q1",
			dataType: "json",
			ContentType: "application/json",
			data: {"id" : select.value},
			success: function(data) {
				rows = JSON.parse(data.rows);
				
				for(var i = 0; i < rows.length; i++) {
					var tr = document.createElement('tr');
					var id = document.createElement('td');
					var name = document.createElement('td');
					var cdate = document.createElement('td');
					var owner = document.createElement('td');
					var public = document.createElement('td');

					id.innerHTML = rows[i].Id;
					name.innerHTML = rows[i].Name;
					cdate.innerHTML = rows[i].CreationDate;
					owner.innerHTML = rows[i].Owner;
					public.innerHTML = rows[i].IsPublic;

					tr.appendChild(id);
					tr.appendChild(name);
					tr.appendChild(cdate);
					tr.appendChild(owner);
					tr.appendChild(public);

					new_tbody.appendChild(tr);
				}
				table.replaceChild(new_tbody, table.children[1]);
			}
		});
}

function getQ2() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q2",
			dataType: "json",
			ContentType: "application/json",
			data: {"id" : 3},
			success: function(data) {
				rows = JSON.parse(data.rows);
			}
		});
}

function getQ3() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q3",
			dataType: "json",
			ContentType: "application/json",
			data: {"id" : 3},
			success: function(data) {
				rows = JSON.parse(data.rows);
			}
		});
}

function getQ4() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q4",
			dataType: "json",
			ContentType: "application/json",
			success: function(data) {
				rows = JSON.parse(data.rows);
			}
		});
}

function getQ5() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q5",
			dataType: "json",
			ContentType: "application/json",
			success: function(data) {
				rows = JSON.parse(data.rows);
			}
		});
}

function getQ6() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q6",
			dataType: "json",
			ContentType: "application/json",
			success: function(data) {
				rows = JSON.parse(data.rows);
			}
		});
}

function getQ7() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q7",
			dataType: "json",
			ContentType: "application/json",
			success: function(data) {
				rows = JSON.parse(data.rows);
			}
		});
}

function getQ8() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q8",
			dataType: "json",
			ContentType: "application/json",
			success: function(data) {
				rows = JSON.parse(data.rows);
			}
		});
}

function getQ9() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q9",
			dataType: "json",
			ContentType: "application/json",
			success: function(data) {
				rows = JSON.parse(data.rows);
			}
		});
}

function getQ10() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q10",
			dataType: "json",
			ContentType: "application/json",
			success: function(data) {
				rows = JSON.parse(data.rows);
			}
		});
}

function getQ11() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q11",
			dataType: "json",
			ContentType: "application/json",
			success: function(data) {
				rows = JSON.parse(data.rows);
			}
		});
}

function getQ12() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q12",
			dataType: "json",
			ContentType: "application/json",
			success: function(data) {
				rows = JSON.parse(data.rows);
			}
		});
}