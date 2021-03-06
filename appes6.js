class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	deleteBook(target) {
		if(target.className === 'delete'){
			target.parentElement.parentElement.remove();
		}
	}

	clearFields() {
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';
	}

	addBookToList(book) {
		const list = document.getElementById('book-list');
		const row = document.createElement('tr');

		row.innerHTML =
			`<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href='#' class='delete'>X</a></td>`
		list.appendChild(row)
	}

	showAlert(message, className) {
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
}

////////////////////
// LOCAL STORAGE
class Store {
	static getBooks(){
		let books;
		if(localStorage.getItem('books') === null){
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	};
	
	static displayBooks(){
		const books = Store.getBooks();

		books.forEach(function(book){
			const ui = new UI;
			//ADD BOOK TO UI
			ui.addBookToList(book);
		})
	};
	
	static addBook(book){
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	};
	
	static removeBook(isbn){
		const books = Store.getBooks();
		
		books.forEach(function(book, index){
			if(book.isbn === isbn) {
				books.splice(index, 1);;

			}
		});
		localStorage.setItem('books', JSON.stringify(books));
	};
}

////////////////////
// EVENT LISTENERS

// DOM LOAD
document.addEventListener('DOMContentLoaded', 
Store.displayBooks);

// listener for adding

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
		// add to LS (static method so no need to instantiate)
		Store.addBook(book);

		// add book to list
		ui.addBookToList(book);

		// show success
		ui.showAlert('Book Added!', 'success');

		// clear
		ui.clearFields()
	}
	e.preventDefault();
});

// event listener for delete

document.getElementById('book-list').addEventListener
('click', function(e){
	
	// instantiate UI
	const ui = new UI();	
	// delete book
	ui.deleteBook(e.target)
	// remove from LS
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
	
	// show alert
	ui.showAlert('Book removed!', 'success')

	e.preventDefault();
});