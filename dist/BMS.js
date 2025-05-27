var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BookManager {
    constructor() {
        this.bookList = [];
        this.init();
        this.fetchBooks();
    }
    fetchBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch('books.json');
                if (!res.ok)
                    throw new Error('Failed to fetch books');
                const data = yield res.json();
                this.bookList = data;
                this.renderBooks();
            }
            catch (error) {
                alert("Error fetching books: " + error.message);
            }
        });
    }
    init() {
        const form = document.getElementById('book-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const book = this.loadValues();
            if (book) {
                this.addBook(book);
                form.reset();
            }
        });
        const searchBox = document.getElementById('search');
        if (searchBox) {
            searchBox.addEventListener('input', (e) => {
                const input = document.querySelector('.search').value;
                this.filterBooks(input);
            });
        }
        const sortSelect = document.querySelector('.sort-select');
        sortSelect.addEventListener('change', (e) => {
            this.sortBooks(e.target.value);
        });
    }
    loadValues() {
        const bookId = parseInt(document.querySelector('.book-id').value);
        const title = document.querySelector('.title').value;
        const author = document.querySelector('.author').value;
        const isbn = document.querySelector('.isbn').value;
        const year = parseInt(document.querySelector('.year').value);
        const genre = document.querySelector('.genre').value;
        if (!bookId || !title || !author || !isbn || !year || !genre) {
            alert('Please fill in all fields.');
            return;
        }
        return { bookId, title, author, isbn, year, genre };
    }
    addBook(book) {
        this.bookList.push(book);
        this.age = this.calculateAge(book.year);
        this.renderBooks();
        alert('Book added successfully!');
    }
    calculateAge(year) {
        const currentYear = new Date().getFullYear();
        return currentYear - year;
    }
    renderBooks(filteredList = null) {
        let bookHtml = '';
        const tbody = document.querySelector('.book-table');
        const books = filteredList || this.bookList;
        tbody.innerHTML = '';
        for (let i = 0; i < books.length; i++) {
            const bookObject = this.bookList[i];
            const { bookId, title, author, isbn, year, genre } = bookObject;
            const category = this.getGenreCategory(genre);
            this.age = this.calculateAge(year);
            const row = `
          <tr>
              <td data-label="title">${bookId}</td>
              <td data-label="title">${title}</td>
              <td data-label="author">${author}</td>
              <td data-label="isbn">${isbn}</td>
              <td data-label="year">${year}</td>
              <td data-label="year">${genre}</td>
              <td data-label="genre">${this.age}</td>
              <td data-label="category">${category}</td>

              <td data-label="Edit">    
                  <button type = "button" class="edit-button">Edit</button>
              </td>
      
              <td data-label="Delete">    
                  <button type = "button" class="delete-button">Delete</button>
              </td>

              <td data-label="Details">
                  <button type="button" class="detail-button">Details</button>
              </td>
          </tr>
          `;
            bookHtml += row;
        }
        tbody.innerHTML = bookHtml;
        this.attachEventListeners();
    }
    attachEventListeners() {
        document.querySelectorAll('.delete-button').forEach((btn, index) => btn.addEventListener('click', () => this.deleteBook(index)));
        document.querySelectorAll('.edit-button').forEach((btn, index) => btn.addEventListener('click', () => this.editBook(index)));
        document.querySelectorAll('.detail-button').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.showBookDetails(this.bookList[index]);
            });
        });
    }
    deleteBook(index) {
        this.bookList.splice(index, 1);
        setTimeout(() => { alert("Book is deleted"); }, 500);
        this.renderBooks();
    }
    editBook(index) {
        const book = this.bookList[index];
        document.querySelector('.book-id').value = book.bookId.toString();
        document.querySelector('.title').value = book.title;
        document.querySelector('.author').value = book.author;
        document.querySelector('.isbn').value = book.isbn;
        document.querySelector('.year').value = book.year.toString();
        document.querySelector('.genre').value = book.genre;
        this.updateBook(index); // remove old version
    }
    updateBook(index) {
        this.bookList.splice(index, 1);
    }
    sortBooks(criterion) {
        if (!criterion)
            return;
        this.bookList.sort((a, b) => {
            if (criterion === 'year' || criterion === 'bookId') {
                return a[criterion] - b[criterion];
            }
            else
                return a[criterion].localeCompare(b[criterion]);
        });
        this.renderBooks();
    }
    getGenreCategory(genre) {
        const genreMap = {
            action: 'Action',
            thriller: 'Thriller',
            romance: 'Romance',
            fiction: 'Fiction',
            nonfiction: 'Non-Fiction',
            mystery: 'Mystery',
            scifi: 'Sci-Fi',
            fantasy: 'Fantasy'
        };
        return genreMap[genre.toLowerCase()] || 'Other';
    }
    filterBooks(keyword) {
        const filtered = this.bookList.filter((book) => book.title.toLowerCase().includes(keyword.toLowerCase()));
        this.renderBooks(filtered);
    }
    showBookDetails(book) {
        const detailDiv = document.querySelector('.book-detail');
        if (!detailDiv) {
            return;
        }
        detailDiv.innerHTML = `
    <strong>Book Details:</strong><br>
    Book-Id: ${book.bookId}<br>
    Title: ${book.title}<br>
    Author: ${book.author}<br>
    ISBN: ${book.isbn}<br>
    Year: ${book.year}<br>
    Genre: ${book.genre}<br>
    Age: ${this.age} years old
  `;
        detailDiv.style.display = 'block';
    }
}
