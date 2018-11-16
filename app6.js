class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

class UI{
    addBookToList(book){
           //Get the output list
        const bookList = document.getElementById('book-list');
        //create element for output
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='delete'><i class="material-icons">clear</i></a> </td>
        `;

        bookList.appendChild(row); 
    }

    showAlert(message, className){
             //Create Div
            const div = document.createElement('div');
            //add class
            div.className = `alert ${className}`;
            //add text
            div.appendChild(document.createTextNode(message));
            //Insert into document/  Get the parent
            const beforeAlert = document.querySelector('.before');
            const afterAlert = document.querySelector('.under');
            //insert alert
            beforeAlert.insertBefore(div, afterAlert);

            //Timeout after 3s
            setTimeout(function(){
                document.querySelector('.alert').remove();
            },3000);
    }

    clearfield(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    deleteBook(target){
        if(target.className == "material-icons"){
            target.parentElement.parentElement.parentElement.remove();
        }
    }

}

//local storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;

            //add book to UI
            ui.addBookToList(book);
        });
    }

    static addBooks(book){
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBooks(){

    }

}

//Dom load event
document.addEventListener('DOMContentLoaded', Store.displaybooks);

//Event Listeners to add the book
document.getElementById('book-form').addEventListener('submit',function(e){
    //Form values
   const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
         isbn = document.getElementById('isbn').value;
        
         //Instantiate book
    const book = new Book(title, author, isbn);
    //Instantiate UI
    const ui = new UI();

    //Validate
    if(title === ''|| author === '' || isbn === '' ){
        //Error alert
        ui.showAlert('Please fill in all fields','error');
    } else{
        //Add book to list
       ui.addBookToList(book);
        //add to ls
       Store.addBooks(book);

     //ui.showAlert
     ui.showAlert('Your book was successfully added', 'success');

     //clear field

     ui.clearfield();

    }
        
})

//Event Listner for delete
document.getElementById('book-list').addEventListener('click', function(e){
     //Instantiate UI
     const ui = new UI();
    //prototype delete book
    ui.deleteBook(e.target);

    //ui.showAlert
    ui.showAlert('Your book was successfully removed' , 'success');

    e.preventDefault();
})