todos = [];
userID = 3;

function TodoItem(id, name, date, desc, remind, rating, done) {
	this.id = id;
	this.name = name;
	this.date = date;
	this.desc = desc;
	this.remind = remind;
	this.rating = rating;
	this.done = done;
	this.toString = function() {
		return ("[Name: " + this.name
			+ ", Description: " + this.desc
			+ ", Due date: " + this.date
			+ ", Reminder: " + this.remind
			+ ", Importance rating: " + this.rating
			+ "] \n")
	};
}

function TodoDate(day, month, year) {
	this.day = day,
	this.month = month,
	this.year = year
}

TodoDate.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
TodoDate.prototype.getMonthName = function(month) {
	return TodoDate.monthNames[month-1];
}

function addItem() {
	var item = createItem();
	sendTodo(item);
}

function createItem() {
	var name = $("#todo-name").val();
	var desc = $("#todo-desc").val();
	var doDay = parseInt($("#todo-day").val());
	var doMonth = parseInt($("#todo-month").val());
	var doYear = parseInt($("#todo-year").val());
	
	var date = new TodoDate(doDay, doMonth, doYear);
	
	var remindDate;
	
	// only collect remind date values if remind box is checked
	if($("#remind-toggle").is(":checked")) {
		var remindDay = parseInt($("#remind-day").val());
		var remindMonth = parseInt($("#remind-month").val());
		var remindYear = parseInt($("#remind-year").val());
		remindDate = new TodoDate(remindDay, remindMonth, remindYear);
	}
	else {
		remindDate = null;
	}
	
	var rate;
	for(var i = 1; i < 6; i++) {
		if(document.getElementById('ra'+i).checked) {
			rate = i;
		}
	}
	rate = rate|0; // default to 0
	
	var item = new TodoItem(0, name, date, desc, remindDate, rate, false);
	console.log(item);
	return item;
}

function addItemHTML(item) {
	
	var itemDiv = document.createElement('div');
	itemDiv.className = 'todo-item';
	itemDiv.id = item.id;
	
	var contentDiv = document.createElement('div');
	contentDiv.className = 'todo-content';
	
	var nameSpan = document.createElement('p');
	nameSpan.className = 'todo-name';
	nameSpan.innerHTML = item.name.length > 0 ? (item.name) : 'nameless';
	
	var descSpan = document.createElement('p');
	descSpan.className = 'todo-desc';
	descSpan.innerHTML = item.desc.length > 0 ? item.desc : 'no description';
	
	var dateSpan = document.createElement('p');
	dateSpan.className = 'todo-date';
	dateSpan.innerHTML = item.date.day + " " +
						 item.date.getMonthName(item.date.month) + " " +
						  item.date.year;
	
	var prioritySpan = document.createElement('p');
	prioritySpan.className = 'todo-rating';
	prioritySpan.innerHTML = " rating[" + item.rating + "]";
	
	contentDiv.appendChild(nameSpan);
	contentDiv.appendChild(dateSpan);
	contentDiv.appendChild(document.createElement('hr'));
	contentDiv.appendChild(descSpan);
	contentDiv.appendChild(document.createElement('br'));
	contentDiv.appendChild(prioritySpan);
	
	itemDiv.appendChild(contentDiv);
	
	var buttonDiv = document.createElement('div');
	buttonDiv.className = 'todo-buttons';
	
	var doneButton = document.createElement('button');
	doneButton.innerHTML = 'done';
	doneButton.className = 'item-button';
	doneButton.onclick = function() {doneTodo(item.id)};
	
	var editButton = document.createElement('button');
	editButton.innerHTML = 'edit';
	editButton.className = 'item-button';
	editButton.onclick = function() {editItem(editButton)};
	
	var removeButton = document.createElement('button');
	removeButton.innerHTML = 'remove';
	removeButton.className = 'item-button';
	removeButton.onclick = function() {deleteTodo(item.id)};
	
	buttonDiv.appendChild(doneButton);
	buttonDiv.appendChild(editButton);
	buttonDiv.appendChild(removeButton);
	
	itemDiv.appendChild(buttonDiv);
	
	document.getElementById("todo-list").appendChild(itemDiv);
	if(item.done) {
		doneHTML(item.id);
	}
}

function clearForm() {
	document.getElementById('todo-name').value = "";
	document.getElementById('todo-desc').value = "";
	document.getElementById('todo-name').value = "";
	for(var i = 1; i < 6; i++) {
		document.getElementById('ra'+i).checked = false;
	}
}

function toggleRemind() {
	if($("#remind-toggle").is(":checked")) {
		$('.remind').prop('disabled', false);
	}
	else {
		$('.remind').prop('disabled', true);
	}
}

function addTodosToHTML() {
	document.getElementById("todo-list").innerHTML = "";
	for(var i = 0; i < todos.length; i++) {
		addItemHTML(todos[i]);
	}
}

function emptyListHTML() {
	if(todos.length == 0) {
		document.getElementById("empty-list").style.display = "block";
	}
	else {
		document.getElementById("empty-list").style.display = "none";
	}
}

$(document).ready(function() {
	getTodos();
	setInterval(getTodos, 3000);
	clickEvents();
});

function clickEvents() {
	$('#add-todo').click(function() {
		addItem();
	});
	$('#sort-date').click(function() {
		sortDate();
	});
	$('#sort-rating').click(function() {
		sortRating();
	});
	$('input').keypress(function (e) {
		var key = e.which;
		if(key == 13) {
			addItem();
		}
	});
}

/*$(document).click(function(event) { 
    if(!$(event.target).closest('#menucontainer').length) {
        if($('#menucontainer').is(":visible")) {
            $('#menucontainer').hide();
        }
    }        
});*/
