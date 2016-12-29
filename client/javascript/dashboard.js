$(document).ready(function() {
	getQ1();
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
});

function getQ1() {
	$.ajax
		({
			type: "GET",
			url: "http://localhost:3000/Q1",
			dataType: "json",
			ContentType: "application/json",
			data: {"id" : 3},
			success: function(data) {
				rows = JSON.parse(data.rows);
				console.log(rows);
				var div = document.getElementById('Q1');
				var table = document.createElement('table');
				var headtr = document.createElement('tr');
				headtr.className = "q1head";

				var hid = document.createElement('th');
				hid.innerHTML = 'ID';
				headtr.appendChild(hid);
				var hname = document.createElement('th');
				hname.innerHTML = 'Name';
				headtr.appendChild(hname);
				var hdate = document.createElement('th');
				hdate.innerHTML = 'Creation Date';
				headtr.appendChild(hdate);
				var howner = document.createElement('th');
				howner.innerHTML = 'Owner';
				headtr.appendChild(howner);
				var hpublic = document.createElement('th');
				hpublic.innerHTML = 'Is Public';
				headtr.appendChild(hpublic);

				table.appendChild(headtr);


				for(var i = 0; i < rows.length; i++) {
					var tr = document.createElement('tr');
					var id = document.createElement('td');
					id.innerHTML = rows[i].Id;

					tr.appendChild(id);
					table.appendChild(tr);

					
				}
				div.appendChild(table);
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