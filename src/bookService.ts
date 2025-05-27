import { bookInterface } from "./bookInterfaces";
import { Book , GenreMap} from "./type";


export class BookService implements bookInterface
{

    bookList: Book[] = [];
    age: number | undefined;

    constructor ()
    {
        // this.init();
        this.fetchBooks();
    }

    async fetchBooks(): Promise<void> {
        try {
        const res = await fetch('books.json');
        if (!res.ok) throw new Error('Failed to fetch books'); 
        const data: Book[] = await res.json();
        this.bookList = data;
        this.renderBooks();
        } catch (error: any) {
        alert("Error fetching books: " + error.message);
        }
    }
    loadValues(): Book | undefined 
    {
        const bookId = parseInt((document.querySelector('.book-id') as HTMLInputElement).value);
        const title = (document.querySelector('.title') as HTMLInputElement).value;
        const author = (document.querySelector('.author') as HTMLInputElement).value;
        const isbn = (document.querySelector('.isbn') as HTMLInputElement).value;
        const year = parseInt((document.querySelector('.year') as HTMLInputElement).value);
        const genre = (document.querySelector('.genre') as HTMLInputElement).value;

        if (!bookId || !title || !author || !isbn || !year || !genre) 
            {
                alert('Please fill in all fields.');
                return;
            }

        return { bookId, title, author, isbn, year, genre };
    }

    addBook(book: Book): void 
    {
        this.bookList.push(book);
        this.age = this.calculateAge(book.year);
        this.renderBooks();
        alert('Book added successfully!');
    }

    calculateAge(year: number): number 
    {
        const currentYear = new Date().getFullYear();
        return currentYear - year;
    }

    renderBooks(filteredList: Book[] | null = null ): void 
    {
        let bookHtml = '';

        const tbody = document.querySelector('.book-table') as HTMLTableSectionElement;     
        const books = filteredList || this.bookList;

        tbody.innerHTML = '';

        for(let i = 0; i < books.length ; i++)
        {
            const bookObject = this.bookList[i];
            const{bookId, title , author , isbn , year , genre} = bookObject;
            const category = this.getGenreCategory(genre); 
            this.age = this.calculateAge(year);
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

    attachEventListeners(): void 
    {
        document.querySelectorAll('.delete-button').forEach((btn, index) =>
        btn.addEventListener('click', () => this.deleteBook(index))
        );

        document.querySelectorAll('.edit-button').forEach((btn, index) =>
        btn.addEventListener('click', () => this.editBook(index))
        );

        document.querySelectorAll('.detail-button').forEach((btn, index) =>{
        btn.addEventListener('click' , () => 
            {
            this.showBookDetails(this.bookList[index]);
            })
        });

    }

    deleteBook(index: number): void 
    {
        this.bookList.splice(index, 1);
        setTimeout(() => {alert("Book is deleted")}, 500);
        this.renderBooks();
    }

    editBook(index: number): void 
    {
        const book = this.bookList[index];

        (document.querySelector('.book-id') as HTMLInputElement).value = book.bookId.toString();
        (document.querySelector('.title') as HTMLInputElement).value = book.title;
        (document.querySelector('.author') as HTMLInputElement).value = book.author;
        (document.querySelector('.isbn') as HTMLInputElement).value = book.isbn;
        (document.querySelector('.year') as HTMLInputElement).value = book.year.toString();
        (document.querySelector('.genre') as HTMLInputElement).value = book.genre;

        this.updateBook(index) // remove old version
    }

    updateBook(index: number): void 
    {
        this.bookList.splice(index,1);
    }


    sortBooks(criterion: string | number): void 
    {
        if (!criterion) return;

        this.bookList.sort((a: any , b :any ) => {
        if (criterion === 'year' || criterion === 'bookId')
            {
            return a[criterion] - b[criterion];
            } 
            else 
            return a[criterion].localeCompare(b[criterion]);
        });

        this.renderBooks();
    }

    getGenreCategory(genre: string): string 
    {
        const genreMap: GenreMap = {
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

    filterBooks(keyword: any) :void 
    {
            const filtered = this.bookList.filter((book: Book) => 
            book.title.toLowerCase().includes(keyword.toLowerCase())
        );
        this.renderBooks(filtered);
    }

    showBookDetails(book:Book): void 
    {
        const detailDiv = document.querySelector('.book-detail') as HTMLDivElement | null;

        if (!detailDiv) 
            { return;  }

        detailDiv.innerHTML = 
        `
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