
import { Book, GenreMap } from './type';
// import { LogMethod } from './utils';

class BookManager {
  private bookList: Book[] = [];
  private age: number | undefined;

  constructor() {
    this.init();
    this.fetchBooks();
  }

  private async fetchBooks(): Promise<void> {
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

  private init(): void {
    const form = document.getElementById('book-form') as HTMLFormElement;
    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const book = this.loadValues();
      if (book) {
        this.addBook(book);
        form.reset();
      }
    });

    const searchBox = document.getElementById('search') as HTMLInputElement | null;
    if(searchBox) 
      {
        searchBox.addEventListener('input' , (e: Event) => 
          {
              const target1 = e.target as HTMLInputElement;
              this.filterBooks(target1.value);
          });
      }

    const sortSelect = document.querySelector('.sort-select') as HTMLSelectElement;
    sortSelect.addEventListener('change', (e) => {
      this.sortBooks((e.target as HTMLSelectElement).value);
    });
  }

  private loadValues(): Book | undefined {
    const bookId = parseInt((document.querySelector('.book-id') as HTMLInputElement).value);
    const title = (document.querySelector('.title') as HTMLInputElement).value;
    const author = (document.querySelector('.author') as HTMLInputElement).value;
    const isbn = (document.querySelector('.isbn') as HTMLInputElement).value;
    const year = parseInt((document.querySelector('.year') as HTMLInputElement).value);
    const genre = (document.querySelector('.genre') as HTMLInputElement).value;

    if (!bookId || !title || !author || !isbn || !year || !genre) {
      alert('Please fill in all fields.');
      return;
    }

    return { bookId, title, author, isbn, year, genre };
  }

  //@LogMethod
  private addBook(book: Book): void {
    this.bookList.push(book);
    this.age = this.calculateAge(book.year);
    this.renderBooks();
    alert('Book added successfully!');
  }

  private calculateAge(year: number): number {
    const currentYear = new Date().getFullYear();
    return currentYear - year;
  }

  private renderBooks(filteredList: Book[] | null = null ): void {
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

  private attachEventListeners(): void {
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

  private deleteBook(index: number): void {
    this.bookList.splice(index, 1);
    setTimeout(() => {alert("Book is deleted")}, 500);
    this.renderBooks();
  }

  private editBook(index: number): void {
    const book = this.bookList[index];

    (document.querySelector('.book-id') as HTMLInputElement).value = book.bookId.toString();
    (document.querySelector('.title') as HTMLInputElement).value = book.title;
    (document.querySelector('.author') as HTMLInputElement).value = book.author;
    (document.querySelector('.isbn') as HTMLInputElement).value = book.isbn;
    (document.querySelector('.year') as HTMLInputElement).value = book.year.toString();
    (document.querySelector('.genre') as HTMLInputElement).value = book.genre;

    this.updateBook(index) // remove old version
  }

  private updateBook(index: number): void 
  {
    this.bookList.splice(index,1);
  }


  private sortBooks(criterion: string | number): void {
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

  private getGenreCategory(genre: string): string {
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

  private filterBooks(keyword: string) :void 
  {
    const filtered = this.bookList.filter(book => 
        book.title.toLowerCase().includes(keyword.toLowerCase())
    );
    this.renderBooks(filtered);
  }

  private showBookDetails(book:Book): void 
  {
    const detailDiv = document.querySelector('.book-detail') as HTMLDivElement | null;
    if (!detailDiv) 
    {
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
    Age: ${this.calculateAgeFromYear(book.year)} years old
  `;

  detailDiv.style.display = 'block';
  }

  private calculateAgeFromYear(year: any): number 
  {
    const currentYear = new Date().getFullYear();
    return currentYear- parseInt(year);
  }

}

new BookManager();
