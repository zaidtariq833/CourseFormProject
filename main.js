//Book class represents a book
class Book{
   constructor(title, author, isbn){
    this.title = title;
    this.author = author
    this.isbn = isbn
   }
}

//UI Class handles UI tasks
class UI{
    static displayBooks(){
       const storedBooks = [
          {
            title: 'Book One',
            author: 'John Doe',
            isbn: '343344'
          },
          {
            title: 'Book Two',
            author: 'Jane Doe',
            isbn: '545544'
          }
        ]

        const books = storedBooks;
        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book){
        const list = document.querySelector("#book-list")

        const row = document.createElement('tr')

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class = "btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row)
    }

  static clearFields(){
    document.querySelector("#title").value = ""
    document.querySelector("#author").value = ""
    document.querySelector("#isbn").value = ""
  }

  static deleteBook(e){
   if(e.classList.contains('delete')){
    e.parentNode.parentNode.remove()
   }
  }

  static showAlert(message, className){
     const div = document.createElement('div');
     div.className = `
     alert alert-${className}
     `
     div.appendChild(document.createTextNode(message))
     const container = document.querySelector(".container");
     const form = document.querySelector("#book-form")
     container.insertBefore(div, form)

     //Vanish in 3 seconds
     setTimeout(() => {
      document.querySelector('.alert').remove()
     }, 3000)
  }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    // Prevent Default
  e.preventDefault()
  //Get from values
  const title = document.querySelector("#title").value
  const author = document.querySelector("#author").value
  const isbn = document.querySelector("#isbn").value

  //Validate Value

   if(title === '' || author === ''){
    UI.showAlert('Please fill the empty fields', 'danger')
  } 
   else{
  //Instantiate book
  const book = new Book(title, author, isbn)

  //Add book to UI
  UI.addBookToList(book)

  //Show success message
  UI.showAlert('Book has been added', 'success')

  //Clear fields
  UI.clearFields()
}
})

//Event: Remove A book
document.querySelector("#book-list").addEventListener('click', (e) => {
  UI.deleteBook(e.target)

  
  //Show success message
  UI.showAlert('Book has been deleted', 'info')
})