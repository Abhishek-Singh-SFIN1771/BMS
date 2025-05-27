export class BookManager {
    constructor(bi) {
        this.bi = bi;
        this.init();
    }
    init() {
        const form = document.getElementById('book-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const book = this.bi.loadValues();
            if (book) {
                this.bi.addBook(book);
                form.reset();
            }
        });
        const searchBox = document.getElementById('search');
        if (searchBox) {
            searchBox.addEventListener('input', (e) => {
                const input = document.querySelector('.search').value;
                this.bi.filterBooks(input);
            });
        }
        const sortSelect = document.querySelector('.sort-select');
        sortSelect.addEventListener('change', (e) => {
            this.bi.sortBooks(e.target.value);
        });
    }
}
