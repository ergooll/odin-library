let myLibrary = [
    new Book('Dune', 'Frank Herbert', 896, false),
    new Book('Red Mars', 'Kim Stanley Robinson', 501, false)
];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        let readText = 'not read yet';
        if (read == true) {
            readText = 'book has been read'
        } else {
            readText = 'not read yet'
        }
        return title + ' by ' + author + ', ' + pages + ' pages, ' + readText;
    }
}

function addBookToLibrary() {
    
}

console.log(myLibrary);