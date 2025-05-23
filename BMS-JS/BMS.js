class Book {
    bookList = [];
    age = undefined;

    constructor() {
        this.start();
        this.fetchBooksFromServer();
    }

    async fetchBooksFromServer() {
        try {
            const result = await fetch('books.json'); // Fetching from local JSON file
            if (!result.ok) throw new Error('Failed to fetch books');
            this.bookList = await result.json();
            
            this.renderBooks();
        } catch (error) {
            alert("Error fetching books: " + error.message);
        }
    }

    start() {
        const form = document.getElementById('book-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const book = this.loadingValues();
            if (book) {
                await this.addBookToList(book);
                form.reset();
            }
        });

        const searchBox = document.getElementById('search');
        if (searchBox) {
            searchBox.addEventListener('input', (e) => {
                this.filterBooks(e.target.value);
            });
        }

        const sortSelect = document.querySelector('.sort-select');
        sortSelect.addEventListener('change', (e) => {
            this.sortBooks(e.target.value);
        });
    }

    loadingValues() {
        const bookId = parseInt(document.querySelector('.book-id').value);
        const title = document.querySelector('.title').value;
        const author = document.querySelector('.author').value;
        const isbn = document.querySelector('.isbn').value;
        const year = document.querySelector('.year').value;
        const genre = document.querySelector('.genre').value;

        if (!bookId || !title || !author || !isbn || !year || !genre) {
            alert('Fill all the fields');
            return;
        }else{
        const book = 
        {bookId : bookId ,title : title, author : author, isbn : isbn, year : year, genre : genre};

        return book;
        }
    }

    async addBookToList(book) {
        try {
            // Simulating async POST to server 
           // book.bookId = Date.now(); // Unique id
            this.bookList.push(book);
           // this.age = this.calculateAge(book.year);
            this.renderBooks();
            alert('Book added!');
        } catch (err) {
            alert('Error adding book: ' + err.message);
        }
    }

    calculateAge(year) {
        const publishYear = parseInt(year);
        const currentYear = new Date().getFullYear();

        return currentYear - publishYear;
    }

    renderBooks(filteredList = null) {
        let bookHtml = '';
        const tbody = document.querySelector('.book-table');         
        const books = filteredList || this.bookList;

        for(let i = 0; i < books.length ; i++)
            {
                const bookObject = this.bookList[i];
                const{bookId, title , author , isbn , year , genre} = bookObject;
                this.age = this.calculateAge(year);
                const category = this.categorizedGenre(genre); 
                const row =  
                `
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
                `
                bookHtml += row;
            }  

            tbody.innerHTML= bookHtml;
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.querySelectorAll('.delete-button')
        .forEach((deleteButtonElement, index) =>
        {
            deleteButtonElement.addEventListener('click',() => 
                {
                    this.deleteBook(index);
                });
        });

        document.querySelectorAll('.edit-button')
        .forEach((editButtonElement, index) =>
        {
           
            editButtonElement.addEventListener('click',() => 
                {
                   this.editBook(index);
                }); 
        });

        document.querySelectorAll('.detail-button').forEach((button, index) => {
            button.addEventListener('click', () => {
                this.showBookDetails(this.bookList[index]);
            });
        });
        
        
    }

    deleteBook(index) {
         this.bookList.splice(index, 1);
        setTimeout(
            () => {alert('book is deleted')},500);
        this.renderBooks();
    }

    editBook(index) {
        const book = this.bookList[index];

        document.querySelector('.book-id').value = book.bookId;
        document.querySelector('.title').value = book.title;
        document.querySelector('.author').value = book.author;
        document.querySelector('.isbn').value = book.isbn;
        document.querySelector('.year').value = book.year;
        document.querySelector('.genre').value = book.genre;

        this.updateBook(index);
    }

    updateBook(index)
    {
         this.bookList.splice(index, 1);
    }

    categorizedGenre(genre) {
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
        const filtered = this.bookList.filter(book => book.title.toLowerCase().includes(keyword.toLowerCase()));
        this.renderBooks(filtered);
    }

    sortBooks(criterion) {
        if (!criterion) return;

        this.bookList.sort((a, b) => {
            if (criterion === 'year') {
            return parseInt(a.year) - parseInt(b.year);
            }
            else if(criterion === 'bookId')
            {
                return parseInt(a.bookId) - parseInt(b.bookId);
            }
            else 
            {
            return a[criterion].localeCompare(b[criterion]);
            }
        });

        this.renderBooks();
    }

    showBookDetails(book) {
    const detailDiv = document.querySelector('.book-detail');
    detailDiv.innerHTML = `
        <strong>Book Details:</strong><br>
        Book-Id: ${book.bookId}<br>
        Title: ${book.title}<br>
        Author: ${book.author}<br>
        ISBN: ${book.isbn}<br>
        Year: ${book.year}<br>
        Genre: ${book.genre}<br>
        Age: ${this.calculateAgeFromYear(book.year)} years old
    `;
    detailDiv.style.display = 'block';
    }

    calculateAgeFromYear(year) {
    const currentYear = new Date().getFullYear();
    return currentYear - parseInt(year);
    }
}

new Book();
