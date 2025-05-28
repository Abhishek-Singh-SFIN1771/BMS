import { Book } from "./type"

export interface bookInterface
{
    bookList: Book[];

    age: number | undefined;

    fetchBooks(): Promise<void>;

    loadValues(): Book | undefined;

    addBook(book: Book): void;

    calculateAge(year: number): number;

    attachEventListeners(): void;

    deleteBook(index: number): void;

    editBook(index: number): void;

    updateBook(index: number): void;

    sortBooks(criterion: string | number): void;

    getGenreCategory(genre: string): string;

    filterBooks(keyword: string) :void;

    renderBooks(): void;

    attachEventListeners(): void;

    showBookDetails(book:Book): void;
}