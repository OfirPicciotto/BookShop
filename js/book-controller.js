'use strict'

function onInit() {
    renderBooks();
    renderPages();
}

function renderBooks() {
    var books = getBooks()
    var strHtmlHead = '<table><thead><tr><th>Id</th><th>Title</th><th>Price</th><th>Rating</th><th>Actions</th></tr></thead>'
    var strHtmls = books.map(function (book) {
        return `
        <tr class="book${book.id}">
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td class="price">${book.price}$</td>
        <td class="rating">${book.rating}</td>
        <td><button class="read-btn" onclick="onReadBook(${book.id})">Read</button>
        <button class="update-btn" onclick="onUpdateBook(${book.id})">Update</button>
        <button class="remove-btn" onclick="onRemoveBook(${book.id})">Delete</button>
        </td>
        </tr>
        </tbody>
        `
    })
    var finalStr = strHtmlHead + strHtmls.join('')
    document.querySelector('[name="books-container"]').innerHTML = finalStr;
}

function renderPages() {
    var strHtmlPage = '';
    for (var i = 1; i <= getPageCount(); i++) {
        strHtmlPage += `<button class="page${i}" onclick=onPageClick(${i})>${i}</button>`
    }
    var elPages = document.querySelector('.btn-next-container')
    elPages.innerHTML = strHtmlPage
}

function onRemoveBook(bookId) {
    if (confirm("Are you sure you want to delete this book?")) {
        removeBook(bookId);
        renderBooks();
    }
    else return;

}

function onAddBtnClick() {
    var elAddControl = document.querySelector('.input-new-book');
    elAddControl.style.display = 'block'
}

function onAddBookClose() {
    var elAddControl = document.querySelector('.input-new-book');
    elAddControl.style.display = 'none'
}

function onAddBook() {
    var elTitle = document.querySelector('.book-name').value;
    if (!elTitle) return;
    var elPrice = +document.querySelector('.book-price').value;
    if (!elPrice) return;
    addBook(elTitle, +elPrice.toFixed(2))
    renderBooks()
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('Enter new price');
    if (newPrice <= 0) return;
    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'flex';
    elModal.querySelector('.title').innerText = `${book.title}`
    // elModal.querySelector('.rating-display').innerText = `${book.rating}`
    elModal.querySelector('.price').innerText = `${book.price}$`
    elModal.querySelector('.img-placeholder').innerHTML = `<img src="./img/${book.id}.jpg" alt="Book ${book.id} Cover.jpg">`
    elModal.querySelector('p').innerText = book.description
    elModal.hidden = false;

}

function onCloseModal() {
    document.querySelector('.modal').style.display = 'none'
}

function onRatingClick(direction) {
    var elBookTitle = document.querySelector('.title').innerText;
    var currBook = getBookByTitle(elBookTitle);
    updateBookRating(currBook.id, direction);
    var elRating = document.querySelector('.form-control');
    elRating.innerHTML = `${currBook.rating}`
    renderBooks();
}

function onNextPage(direction) {
    nextPage(direction);
    renderBooks();
}

function onPageClick(page) {
    navigateToPage(page);
    renderBooks();
}

