const libraryContainer = document.querySelector('.library-container');
const form = document.querySelector("#new-book-form");
const newBook = document.querySelector("#createEntry");
const closeButton = document.querySelector("#popupCancelButton");

const popupContainer = document.querySelector('.popup-container');
const popupWindow = document.querySelector('.popup-window');
const popupButtons = document.querySelectorAll('.popup-button');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

let books = [
    new Book('Dune', 'Frank Herbert', 896, false),
    new Book('Red Mars', 'Kim Stanley Robinson', 501, true),
    new Book('The Fellowship of the Ring', 'J. R. R. Tolkien', 423, false),
    new Book('The Two Towers', 'J. R. R. Tolkien', 352, false),
    new Book('The Return of the King', 'J. R. R. Tolkien', 416, false),
    new Book('The War of the Worlds', 'H.G. Wells', 287, false),
    new Book('Casino Royale', 'Ian Fleming', 213, false)
] || JSON.parse(localStorage.getItem('books'));

function addBook(i) {
    let bookNode = document.createElement('div');
    bookNode.classList.add('book');
    bookNode.setAttribute('data-index', `${i}`);

    const title = document.getElementById('popupTitle').value;
    let titleNode = document.createElement('h3');
    titleNode.innerHTML = `Title: ${title}`;

    const author = document.getElementById("popupAuthor").value;
    let authorNode = document.createElement("p");
    authorNode.innerHTML = `Author: ${author}`;

    const pages = document.getElementById("popupPages").value;
    let pageNode = document.createElement("p");
    pageNode.innerHTML = `Pages: ${pages}`;

    const read = document.getElementById("popupRead").value;
    let readNode = document.createElement("p");
    if (book.read == true) {
        readText = 'Read'
        readColor = '#5bc359';
    } else {
        readText = 'Not read'
        readColor = '#f24b4b';
    }
    readNode.innerHTML = `${readText}`;
    readNode.style.color = `${readColor}`;

    let updateNode = document.createElement('button');
    updateNode.classList = 'markAsRead';
    updateNode.innerHTML = 'Mark As Read';

    let trashNode = document.createElement("button");
    trashNode.classList = "deleteBook";
    trashNode.innerHTML = `Delete`;

    const book = new Book(title, author, pages, read);
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pageNode);
    bookNode.appendChild(readNode);
    bookNode.appendChild(updateNode);
    bookNode.appendChild(trashNode);
    libraryContainer.appendChild(bookNode);

    // update book status
    updateNode.addEventListener("click", () => {
        if (readNode.innerHTML === "Read? No😢") {
        readNode.innerHTML = "Read? Yes😃";
        book.read = "Yes";
        localStorage.setItem("books", JSON.stringify(books));
        } else {
        readNode.innerHTML = "Read? No😢";
        book.read = "No";
        localStorage.setItem("books", JSON.stringify(books));
        }
    });

    // delete book
    trashNode.addEventListener("click", () => {
        libraryContainer.removeChild(bookNode);
        books.splice(bookNode, 1);
        localStorage.setItem("books", JSON.stringify(books));
    });
}

function getBooks() {
    books.forEach(function (book, i) {
        let bookNode = document.createElement("div");
        bookNode.classList.add("book-item");
        bookNode.setAttribute("data-index", `${i}`);
    
        const title = document.getElementById("popupTitle").value;
        let titleNode = document.createElement("h3");
        titleNode.innerHTML = `Title: ${book.title}`;
    
        const author = document.getElementById("popupAuthor").value;
        let authorNode = document.createElement("p");
        authorNode.innerHTML = `Author: ${book.author}`;
    
        const pages = document.getElementById("popupPages").value;
        let pageNode = document.createElement("p");
        pageNode.innerHTML = `Pages: ${book.pages}`;
    
        const read = document.getElementById("popupRead").value;
        let readNode = document.createElement("p");
        if (book.read == true) {
            readText = 'Read'
            readColor = '#5bc359';
        } else {
            readText = 'Not read'
            readColor = '#f24b4b';
        }
        readNode.innerHTML = `${readText}`;
        readNode.style.color = `${readColor}`;
  
        let updateNode = document.createElement("button");
        updateNode.classList = "markAsRead";
        updateNode.innerHTML = `Update <i class="fas fa-pen"></i>`;

        let trashNode = document.createElement("button");
        trashNode.classList = "deleteBook";
        trashNode.innerHTML = `Delete`;

        bookNode.appendChild(titleNode);
        bookNode.appendChild(authorNode);
        bookNode.appendChild(pageNode);
        bookNode.appendChild(readNode);
        bookNode.appendChild(updateNode);
        bookNode.appendChild(trashNode);
        libraryContainer.appendChild(bookNode);
    
        // update book status
        updateNode.addEventListener("click", () => {
        if (readNode.innerHTML === "Read? No😢") {
            readNode.innerHTML = "Read? Yes😃";
            book.read = "Yes";
            localStorage.setItem("books", JSON.stringify(books));
        } else {
            readNode.innerHTML = "Read? No😢";
            book.read = "No";
            localStorage.setItem("books", JSON.stringify(books));
        }
        });
        // delete book
        trashNode.addEventListener("click", () => {
        bookshelf.removeChild(bookNode);
        books.splice(bookNode, 1);
        localStorage.setItem("books", JSON.stringify(books));
        });
    });
}  

// Popup window section

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

window.addEventListener("load", getBooks);
form.addEventListener("submit", (e, i) => {
  e.preventDefault();
  addBook(i);
});