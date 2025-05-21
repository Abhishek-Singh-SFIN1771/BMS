export interface Book {
  bookId: number;
  title: string;
  author: string;
  isbn: string;
  year: number;
  genre: string;
}

export interface GenreMap {
  [key: string]: string;
}