import { BookService } from './bookService.js';
import { BookManager } from './bookManager.js';

document.addEventListener('DOMContentLoaded', () => 
    {
        const bi = new BookService();
        new BookManager(bi);
    });