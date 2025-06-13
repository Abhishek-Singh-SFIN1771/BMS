import { bookInterface } from "./bookInterfaces";

export class BookManager 
{
    private bi: bookInterface;

    constructor(bi: bookInterface)
    {
        this.bi = bi;
        this.init();
    }

    init(): void {
        const form = document.getElementById('book-form') as HTMLFormElement;
        form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const book = this.bi.loadValues();
        if (book) {
            this.bi.addBook(book);
            form.reset();
        }
        });

        const searchBox = document.getElementById('search') as HTMLInputElement | null;
        if(searchBox) 
        {
            searchBox.addEventListener('input' , () => 
            {   
                const input = searchBox.value;
                this.bi.filterBooks(input);
            });
        }

        const sortSelect = document.querySelector('.sort-select') as HTMLSelectElement;
        sortSelect.addEventListener('change', (e) => {
        this.bi.sortBooks((e.target as HTMLSelectElement).value);
        });
    }
}