const libraryContainer = document.querySelector('.library-container');
const form = document.querySelector("#new-book-form");
const newBook = document.querySelector("#createEntry");
const closeButton = document.querySelector("#popupCancelButton");

const popupContainer = document.querySelector('.popup-container');
const popupWindow = document.querySelector('.popup-window');
const popupButtons = document.querySelectorAll('.popup-buttons');

let books = JSON.parse(localStorage.getItem('books')) || [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBook(i) {
    let bookNode = document.createElement('div');
    bookNode.classList.add('book');
    bookNode.setAttribute('data-index', `${i}`);
    let color = getColor();
    bookNode.style.borderColor = color;
    bookNode.style.backgroundColor = color.slice(0, -1) + ', 0.7';

    const title = document.getElementById('popupTitle').value;
    let titleNode = document.createElement('h3');
    titleNode.innerHTML = `${title}`;

    const author = document.getElementById("popupAuthor").value;
    let authorNode = document.createElement("p");
    authorNode.innerHTML = `Author: ${author}`;

    const pages = document.getElementById("popupPages").value;
    let pageNode = document.createElement("p");
    pageNode.innerHTML = `Pages: ${pages}`;

    const read = document.getElementById("popupRead").value;
    let readNode = document.createElement("p");
    if (read == "Yes") {
        readText = 'Read'
        readColor = '#5bc359';
    } else {
        readText = 'Not Read'
        readColor = '#f24b4b';
    }
    readNode.textContent = `${readText}`;
    readNode.style.color = `${readColor}`;
  
    let buttonsNode = document.createElement('div');
    buttonsNode.classList = "book-buttons";

    let updateNode = document.createElement('button');
    updateNode.classList = 'markReadButton';
    updateNode.innerHTML = 'Update';

    let trashNode = document.createElement("button");
    trashNode.classList = "deleteButton";
    trashNode.innerHTML = `Delete`;

    const book = new Book(title, author, pages, read);
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pageNode);
    bookNode.appendChild(readNode);
    bookNode.appendChild(buttonsNode);
    buttonsNode.appendChild(updateNode);
    buttonsNode.appendChild(trashNode);
    libraryContainer.appendChild(bookNode);
    form.reset();

    // update book status
    updateNode.addEventListener("click", () => {
        if (book.read === "No") {
          readNode.textContent = "Read";
          book.read = "Yes";
          readNode.style.color = '#5bc359';
          localStorage.setItem("books", JSON.stringify(books));
        } else {
          readNode.textContent = "Not Read";
          book.read = "No";
          readNode.style.color = '#f24b4b';
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
        bookNode.classList.add("book");
        bookNode.setAttribute("data-index", `${i}`);
        let color = getColor();
        bookNode.style.borderColor = color;
        bookNode.style.backgroundColor = color.slice(0, -1) + ', 0.7';
    
        const title = document.getElementById("popupTitle").value;
        let titleNode = document.createElement("h3");
        titleNode.innerHTML = `${book.title}`;
    
        const author = document.getElementById("popupAuthor").value;
        let authorNode = document.createElement("p");
        authorNode.innerHTML = `Author: ${book.author}`;
    
        const pages = document.getElementById("popupPages").value;
        let pageNode = document.createElement("p");
        pageNode.innerHTML = `Pages: ${book.pages}`;
    
        const read = document.getElementById("popupRead").value;
        let readNode = document.createElement("p");
        if (book.read == "Yes") {
            readText = 'Read'
            readColor = '#5bc359';
        } else {
            readText = 'Not Read'
            readColor = '#f24b4b';
        }
        readNode.textContent = `${readText}`;
        readNode.style.color = `${readColor}`;
  
        let buttonsNode = document.createElement('div');
        buttonsNode.classList = "book-buttons";

        let updateNode = document.createElement("button");
        updateNode.classList = "markReadButton";
        updateNode.innerHTML = `Update`;

        let trashNode = document.createElement("button");
        trashNode.classList = "deleteButton";
        trashNode.innerHTML = `Delete`;

        bookNode.appendChild(titleNode);
        bookNode.appendChild(authorNode);
        bookNode.appendChild(pageNode);
        bookNode.appendChild(readNode);
        bookNode.appendChild(buttonsNode);
        buttonsNode.appendChild(updateNode);
        buttonsNode.appendChild(trashNode);
        libraryContainer.appendChild(bookNode);
    
        // update book status
        updateNode.addEventListener("click", () => {
            if (book.read === "No") {
              readNode.textContent = "Read";
              book.read = "Yes";
              readNode.style.color = '#5bc359';
              localStorage.setItem("books", JSON.stringify(books));
            } else {
              readNode.textContent = "Not Read";
              book.read = "No";
              readNode.style.color = '#f24b4b';
              localStorage.setItem("books", JSON.stringify(books));
            }
        });
        // delete book
        trashNode.addEventListener("click", () => {
        libraryContainer.removeChild(bookNode);
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

// Random background colors
function getColor() { 
    return "hsla(" + 360 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' + 
               (85 + 10 * Math.random()) + '%' + ')'
}