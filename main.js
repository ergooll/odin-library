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
    let readText = 'Not read';
    let readColor = '#f24b4b';
    if (this.read == true) {
        readText = 'Read'
        readColor = '#5bc359';
    } else {
        readText = 'Not read'
        readColor = '#f24b4b';
    }
    // return `${this.title} by ${this.author}, ${this.pages} pages, ${readText}`;
    return `
        <h3>${this.title}</h3>
        <p>by: ${this.author}</p>
        <p>Pages: ${this.pages}</p>
        <p class="book-read" style="color:${readColor}">${readText}</p>
        <div class="book-item-buttons">
            <button class="mark-read-button" id="markReadButton">Mark as read</button>
            <button class="delete-button">Delete Book</button>
        </div>
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

function drawNewBook() {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.innerHTML = myLibrary[myLibrary.length - 1].info();
    libraryContainer.appendChild(bookItem);
}

const newBookForm = document.querySelector('#new-book-form');
newBookForm.addEventListener('submit', function() {
    event.preventDefault();
    addBookToLibrary();
    drawNewBook();
});

function addBookToLibrary() {
    let addTitle = document.querySelector('#popupTitle').value;
    let addAuthor = document.querySelector('#popupAuthor').value;
    let addPages = document.querySelector('#popupPages').value;
    let addRead = document.querySelector('#popupRead').checked;
    let newBook = new Book(addTitle, addAuthor, addPages, addRead);
    myLibrary.push(newBook);
    console.log(newBook);
}

drawLibrary();

// Mark as read button functionality

const markReadButton = document.querySelectorAll('.mark-read-button');
const bookItemRead = document.querySelectorAll('.book-read');

markReadButton.forEach((btn, id) => {
    btn.addEventListener('click', (e) => {
        markBookRead(id);
    });
});

function markBookRead(id) {
    let bookRead = bookItemRead[id];
    let bookID = storedLibrary[id];
    if (bookID.read == false) {
        bookID.read = true;
        bookRead.textContent = 'Read';
        bookRead.style.color = '#5bc359';
    } else {
        bookID.read = false;
        bookRead.textContent = 'Not read';
        bookRead.style.color = '#f24b4b';
    }
}

// Delete book button functionality

const deleteBookButton = document.querySelectorAll('.delete-button');

deleteBookButton.forEach((btn, id) => {
    btn.addEventListener('click', (e) => {
        deleteBook(id);
    });
});

function deleteBook(id) {
    let deleteBookID = bookItemContainer[id];
    libraryContainer.removeChild(deleteBookID);
    // deleteBookID.classList.remove('book-item');
}

// Random color background

let bookItemContainer = document.querySelectorAll('.book-item');

function getColor(){ 
    return "hsla(" + 360 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' + 
               (85 + 10 * Math.random()) + '%' + ')'
}

bookItemContainer.forEach(e => {
    let color = getColor();
    let colorSeeThru = color.slice(0, -1) + ', 0.75)'
    e.style.backgroundColor = colorSeeThru;
    e.style.borderColor = color;
});

// Popup window section

const popupContainer = document.querySelector('.popup-container');
const popupWindow = document.querySelector('.popup-window');
const popupButtons = document.querySelectorAll('.popup-button');


let mouseOnPopupWindow = false;
let mouseOnPopupButtons = false;

popupWindow.addEventListener('mouseenter', (e) => {
    mouseOnPopupWindow = true;
});

popupWindow.addEventListener('mouseleave', (e) => {
    mouseOnPopupWindow = false;
});

popupButtons.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        mouseOnPopupButtons = true;
    });
})

popupButtons.forEach(btn => {
    btn.addEventListener('mouseleave', (e) => {
        mouseOnPopupButtons = false;
    });
})

popupContainer.addEventListener('click', (e) => {
    hidePopup();
});

function showPopup() {
    popupContainer.style.display = 'block';
}

function hidePopup() {
    if (mouseOnPopupWindow == false | mouseOnPopupButtons == true) {
        popupContainer.style.display = 'none';
    }
}

//localStorage

localStorage.setItem('library', JSON.stringify(myLibrary));

let storedLibrary = JSON.parse(localStorage.getItem('library'));