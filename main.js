let myLibrary = [
    new Book('Dune', 'Frank Herbert', 896, false),
    new Book('Red Mars', 'Kim Stanley Robinson', 501, true),
    new Book('The Fellowship of the Ring', 'J. R. R. Tolkien', 423, false),
    new Book('The Two Towers', 'J. R. R. Tolkien', 352, false),
    new Book('The Return of the King', 'J. R. R. Tolkien', 416, false),
    new Book('The War of the Worlds', 'H.G. Wells', 287, false),
    new Book('Casino Royale', 'Ian Fleming', 213, false)
];

const libraryContainer = document.querySelector('.library-container');

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    
}

Book.prototype.info = function() {
    let readText = 'not read yet';
    let readColor = '#f24b4b';
    if (this.read == true) {
        readText = 'book has been read'
        readColor = '#5bc359';
    } else {
        readText = 'not read yet'
        readColor = '#f24b4b';
    }
    // return `${this.title} by ${this.author}, ${this.pages} pages, ${readText}`;
    return `
        <h3>${this.title}</h3>
        <p>by: ${this.author}</p>
        <p>Pages: ${this.pages}</p>
        <p style="color:${readColor}">${readText}</p>
    `
}

function drawLibrary() {
    myLibrary.forEach(obj => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = obj.info();
        libraryContainer.appendChild(bookItem);
    });
}

drawLibrary();

// Popup window section

const popupContainer = document.querySelector('.popup-container');
const popupWindow = document.querySelector('.popup-window');

function showPopup() {
    popupContainer.style.display = 'block';
}

function hidePopup() {
    popupContainer.style.display = 'none';
}

function addBookToLibrary() {
    
}