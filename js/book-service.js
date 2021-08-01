'use strict'
const KEY = 'bookDB';
const PAGE_SIZE = 4;
var gPageIdx = 0;
var gId = 1;


var gBooks;

_createBooks();

function _createBook(title, price = getRandomIntInclusive(10, 25)) {
    return {
        id: gId++,
        title,
        price,
        rating: 0,
        description: makeLorem()
    }
}

function _createBooks() {
    var booksInfo = [
        { title: 'Harry Potter and the Philosopher\'s Stone', price: 18.90 },
        { title: 'Harry Potter and the Chamber of Secrets', price: 6.65 },
        { title: 'Harry Potter and the Prisoner of Azkaban', price: 7.20 },
        { title: 'Harry Potter and the Goblet of Fire', price: 15.25 },
        { title: 'Harry Potter and the Order of the Phoenix', price: 37.30 },
        { title: 'Harry Potter and the Half-Blood Prince', price: 27.20 },
        { title: 'Harry Potter and the Deathly Hallows', price: 17.20 }
    ]
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < booksInfo.length; i++) {
            books.push(_createBook(booksInfo[i].title, +booksInfo[i].price.toFixed(2)))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function addBook(title, price) {
    var book = _createBook(title, price)
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function getBookByTitle(title) {
    return gBooks.find(function (book) {
        return book.title === title
    });
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}
function updateBook(bookId, newPrice) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    book.price = newPrice;
    _saveBooksToStorage();
}

function updateBookRating(bookId, direction) {
    var currBook = gBooks.find(function (book) {
        return book.id === bookId;
    })
    if (direction + '' === 'plus' && currBook.rating < 10) currBook.rating++
    else if (direction + '' === 'minus' && currBook.rating > 0) currBook.rating--
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function getBookById(bookId) {
    var currBook = gBooks.find(function (book) {
        return bookId === book.id
    })
    return currBook
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function nextPage(direction) {
    if (direction === 'next') {
        gPageIdx++;
        if (gPageIdx * PAGE_SIZE >= gBooks.length) {
            gPageIdx = 0;
        }
} else if(direction === 'back'){
    if(gPageIdx === 0) gPageIdx = getPageCount();
    gPageIdx--;  
}

}

function getPageCount() {
    var numOfPages = Math.ceil(gBooks.length / PAGE_SIZE);
    return numOfPages
}

function navigateToPage(page) {
    gPageIdx = page - 1;
}