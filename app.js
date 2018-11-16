//Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn
}


//UI constructor
function UI(){ }

//Ui for the book input
UI.prototype.addBookToList = function(book){
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

//show message
UI.prototype.showAlert = function(message, className){
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

//Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className == "material-icons"){
        target.parentElement.parentElement.parentElement.remove();
    }
}

//Clear input fields
UI.prototype.clearfield = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}





    //const ui = new UI();
    // const bookD = document.getElementById('book-list');
    //  if(e.target.matches('.material-icons')){
    //      bookD.remove();
    //      ui.showAlert('Your book was successfully removed', 'success');
    //  }
