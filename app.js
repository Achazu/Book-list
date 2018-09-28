function Book(title, author, isbn){
	this.title = title;
	this.author = author;
	this.isbn = isbn;

}


function UI(){

}

// clear

UI.prototype.clearFields = function(){
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
	
}

UI.prototype.addBookToList = function(book){
	const list = document.getElementById('book-list');
	const row = document.createElement('tr');

	row.innerHTML =
	`<td>${book.title}</td>
	<td>${book.author}</td>
	<td>${book.isbn}</td>
	<td><a href='#' class='delete'>X</a></td>`
	list.appendChild(row)
}

//show alert
UI.prototype.showAlert = function (message, className){
	const div = document.createElement('div');
	div.className = `alert ${className}`;
	div.appendChild(document.createTextNode(message));

	const container = document.querySelector('.container');
	const form = document.getElementById('book-form');

	container.insertBefore(div, form);

	setTimeout(function(){
		document.querySelector('.alert').remove();
	}, 3000);
}

document.getElementById('book-form').addEventListener('submit', 
function (e){
	// get form values
	const title = document.getElementById('title').value,
		  author = document.getElementById('author').value,
		  isbn = document.getElementById('isbn').value;

	// instantiate book		
	const book = new Book(title, author, isbn);
	
	// instantiate UI
	const ui = new UI();

	// validate 

	if(title === '' || author === '' || isbn === '' ){
		// error alert
		ui.showAlert('Please fill in all fields', 'error');
	} else {
		// add book to list
		ui.addBookToList(book);

		// show success
		ui.showAlert('Book Added!', 'success');

		// clear
		ui.clearFields()
	}



	e.preventDefault();
});